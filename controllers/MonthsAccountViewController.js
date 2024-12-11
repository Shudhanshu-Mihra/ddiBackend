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
  
