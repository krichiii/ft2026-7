const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 5000;
const DATA_FILE = path.join(__dirname, 'inventory.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Create uploads directory if not exists
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
}

// Ensure inventory.json exists
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(UPLOADS_DIR));

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Helper functions for data management
const readData = () => {
  const data = fs.readFileSync(DATA_FILE);
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
};

// --- ENDPOINTS ---

// 1. Get all inventory
app.get('/inventory', (req, res) => {
  try {
    const inventory = readData();
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: 'Error reading inventory' });
  }
});

// 2. Get item by ID
app.get('/inventory/:id', (req, res) => {
  try {
    const inventory = readData();
    const item = inventory.find((i) => i.id === req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: 'Error reading item' });
  }
});

// 3. Create new inventory item (multipart/form-data)
app.post('/register', upload.single('photo'), (req, res) => {
  try {
    const { inventory_name, description } = req.body;
    const photo = req.file;

    const newItem = {
      id: uuidv4(),
      inventory_name,
      description,
      photo_url: photo ? `http://localhost:${PORT}/uploads/${photo.filename}` : null,
      created_at: new Date().toISOString(),
    };

    const inventory = readData();
    inventory.push(newItem);
    writeData(inventory);

    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating item' });
  }
});

// 4. Update inventory text (PUT /inventory/:id)
app.put('/inventory/:id', (req, res) => {
  try {
    const { inventory_name, description } = req.body;
    const inventory = readData();
    const index = inventory.findIndex((i) => i.id === req.params.id);

    if (index === -1) return res.status(404).json({ message: 'Item not found' });

    inventory[index] = {
      ...inventory[index],
      inventory_name: inventory_name || inventory[index].inventory_name,
      description: description || inventory[index].description,
    };

    writeData(inventory);
    res.json(inventory[index]);
  } catch (error) {
    res.status(500).json({ message: 'Error updating text' });
  }
});

// 5. Update inventory photo (PUT /inventory/:id/photo)
app.put('/inventory/:id/photo', upload.single('photo'), (req, res) => {
  try {
    const inventory = readData();
    const index = inventory.findIndex((i) => i.id === req.params.id);

    if (index === -1) return res.status(404).json({ message: 'Item not found' });

    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    // Optional: Delete old photo from FS if it's not a placeholder
    const oldPhotoUrl = inventory[index].photo_url;
    if (oldPhotoUrl && oldPhotoUrl.includes('/uploads/')) {
        const oldFileName = oldPhotoUrl.split('/uploads/')[1];
        const oldPath = path.join(UPLOADS_DIR, oldFileName);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    inventory[index].photo_url = `http://localhost:${PORT}/uploads/${req.file.filename}`;

    writeData(inventory);
    res.json(inventory[index]);
  } catch (error) {
    res.status(500).json({ message: 'Error updating photo' });
  }
});

// 6. Delete inventory
app.delete('/inventory/:id', (req, res) => {
  try {
    let inventory = readData();
    const item = inventory.find((i) => i.id === req.params.id);

    if (!item) return res.status(404).json({ message: 'Item not found' });

    // Delete photo from FS
    if (item.photo_url && item.photo_url.includes('/uploads/')) {
      const fileName = item.photo_url.split('/uploads/')[1];
      const filePath = path.join(UPLOADS_DIR, fileName);
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }

    inventory = inventory.filter((i) => i.id !== req.params.id);
    writeData(inventory);

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting item' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running at http://localhost:${PORT}`);
});
