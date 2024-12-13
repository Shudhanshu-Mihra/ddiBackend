const path = require('path');
const fs = require('fs');

exports.monthAccountView = async (req, res) => {
    const { key } = req.body;
    console.log(key);
    if (key === "Month-Account-View") {
      const filePath = path.join(__dirname, '..','json', 'monthAccountView.json');
        console.log(__dirname,'json');
      // Read the JSON file and send it as a response
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          // Handle error if the file reading fails
          console.error('Error reading file:', err);
          return res.status(500).json({ message: 'Error reading JSON file' });
        }
  
        try {
          // Parse the JSON data and send it in the response
          const jsonData = JSON.parse(data);
          res.status(200).json(jsonData);
        } catch (parseError) {
          console.error('Error parsing JSON:', parseError);
          res.status(500).json({ message: 'Error parsing JSON file' });
        }
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  };
  
  exports.itemMasterView = async (req, res) => {
    const { key } = req.body;
    console.log(key);
    if (key === "Item-Master") {
      const filePath = path.join(__dirname, '..','json', 'itemMaster.json');
        console.log(__dirname,'json');
      // Read the JSON file and send it as a response
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          // Handle error if the file reading fails
          console.error('Error reading file:', err);
          return res.status(500).json({ message: 'Error reading JSON file' });
        }
  
        try {
          // Parse the JSON data and send it in the response
          const jsonData = JSON.parse(data);
          res.status(200).json(jsonData);
        } catch (parseError) {
          console.error('Error parsing JSON:', parseError);
          res.status(500).json({ message: 'Error parsing JSON file' });
        }
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
};

exports.cashEntrymonthAccountView = async (req, res) => {
  const { key } = req.body;
  console.log(key);
  if (key === "Cash-Entry") {
    const filePath = path.join(__dirname, '..','json', 'cashEntry.json');
      console.log(__dirname,'json');
    // Read the JSON file and send it as a response
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        // Handle error if the file reading fails
        console.error('Error reading file:', err);
        return res.status(500).json({ message: 'Error reading JSON file' });
      }

      try {
        // Parse the JSON data and send it in the response
        const jsonData = JSON.parse(data);
        res.status(200).json(jsonData);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        res.status(500).json({ message: 'Error parsing JSON file' });
      }
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

exports.homeView = async (req, res) => {
  const { key } = req.body;
  console.log(key);
  if (key === "Home") {
    const filePath = path.join(__dirname, '..','json', 'home.json');
      console.log(__dirname,'json');
    // Read the JSON file and send it as a response
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        // Handle error if the file reading fails
        console.error('Error reading file:', err);
        return res.status(500).json({ message: 'Error reading JSON file' });
      }

      try {
        // Parse the JSON data and send it in the response
        const jsonData = JSON.parse(data);
        res.status(200).json(jsonData);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        res.status(500).json({ message: 'Error parsing JSON file' });
      }
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

exports.inventoryView = async (req, res) => {
  const { key } = req.body;
  console.log(key);
  if (key === "Inventory") {
    const filePath = path.join(__dirname, '..','json', 'Inventory.json');
      console.log(__dirname,'json');
    // Read the JSON file and send it as a response
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        // Handle error if the file reading fails
        console.error('Error reading file:', err);
        return res.status(500).json({ message: 'Error reading JSON file' });
      }

      try {
        // Parse the JSON data and send it in the response
        const jsonData = JSON.parse(data);
        res.status(200).json(jsonData);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        res.status(500).json({ message: 'Error parsing JSON file' });
      }
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

exports.jvEntryView = async (req, res) => {
  const { key } = req.body;
  console.log(key);
  if (key === "JV-Entry") {
    const filePath = path.join(__dirname, '..','json', 'JVEntry.json');
      console.log(__dirname,'json');
    // Read the JSON file and send it as a response
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        // Handle error if the file reading fails
        console.error('Error reading file:', err);
        return res.status(500).json({ message: 'Error reading JSON file' });
      }

      try {
        // Parse the JSON data and send it in the response
        const jsonData = JSON.parse(data);
        res.status(200).json(jsonData);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        res.status(500).json({ message: 'Error parsing JSON file' });
      }
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

exports.jvfEntryView = async (req, res) => {
  const { key } = req.body;
  console.log(key);
  if (key === "JVF-Entry") {
    const filePath = path.join(__dirname, '..','json', 'JVFEntry.json');
      console.log(__dirname,'json');
    // Read the JSON file and send it as a response
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        // Handle error if the file reading fails
        console.error('Error reading file:', err);
        return res.status(500).json({ message: 'Error reading JSON file' });
      }

      try {
        // Parse the JSON data and send it in the response
        const jsonData = JSON.parse(data);
        res.status(200).json(jsonData);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        res.status(500).json({ message: 'Error parsing JSON file' });
      }
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

exports.jvmEntryView = async (req, res) => {
  const { key } = req.body;
  console.log(key);
  if (key === "JVM-Entry") {
    const filePath = path.join(__dirname, '..','json', 'JVMEntry.json');
      console.log(__dirname,'json');
    // Read the JSON file and send it as a response
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        // Handle error if the file reading fails
        console.error('Error reading file:', err);
        return res.status(500).json({ message: 'Error reading JSON file' });
      }

      try {
        // Parse the JSON data and send it in the response
        const jsonData = JSON.parse(data);
        res.status(200).json(jsonData);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        res.status(500).json({ message: 'Error parsing JSON file' });
      }
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

exports.salesView = async (req, res) => {
  const { key } = req.body;
  console.log(key);
  if (key === "Sales") {
    const filePath = path.join(__dirname, '..','json', 'sales.json');
      console.log(__dirname,'json');
    // Read the JSON file and send it as a response
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        // Handle error if the file reading fails
        console.error('Error reading file:', err);
        return res.status(500).json({ message: 'Error reading JSON file' });
      }

      try {
        // Parse the JSON data and send it in the response
        const jsonData = JSON.parse(data);
        res.status(200).json(jsonData);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        res.status(500).json({ message: 'Error parsing JSON file' });
      }
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

exports.salesGstView = async (req, res) => {
  const { key } = req.body;
  console.log(key);
  if (key === "Sales-GST") {
    const filePath = path.join(__dirname, '..','json', 'salesGST.json');
      console.log(__dirname,'json');
    // Read the JSON file and send it as a response
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        // Handle error if the file reading fails
        console.error('Error reading file:', err);
        return res.status(500).json({ message: 'Error reading JSON file' });
      }

      try {
        // Parse the JSON data and send it in the response
        const jsonData = JSON.parse(data);
        res.status(200).json(jsonData);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        res.status(500).json({ message: 'Error parsing JSON file' });
      }
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

exports.selectCompanyView = async (req, res) => {
  const { key } = req.body;
  console.log(key);
  if (key === "Select-Company") {
    const filePath = path.join(__dirname, '..','json', 'selectCompany.json');
      console.log(__dirname,'json');
    // Read the JSON file and send it as a response
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        // Handle error if the file reading fails
        console.error('Error reading file:', err);
        return res.status(500).json({ message: 'Error reading JSON file' });
      }

      try {
        // Parse the JSON data and send it in the response
        const jsonData = JSON.parse(data);
        res.status(200).json(jsonData);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        res.status(500).json({ message: 'Error parsing JSON file' });
      }
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

exports.uiView = async (req, res) => {
  const { key } = req.body;
  console.log(key);
  if (key === "UI") {
    const filePath = path.join(__dirname, '..','json', 'Ui.json');
      console.log(__dirname,'json');
    // Read the JSON file and send it as a response
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        // Handle error if the file reading fails
        console.error('Error reading file:', err);
        return res.status(500).json({ message: 'Error reading JSON file' });
      }

      try {
        // Parse the JSON data and send it in the response
        const jsonData = JSON.parse(data);
        res.status(200).json(jsonData);
      } catch (parseError) {
        console.error('Error parsing JSON:', parseError);
        res.status(500).json({ message: 'Error parsing JSON file' });
      }
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};