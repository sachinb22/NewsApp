import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Button, Container, Grid, TextField, Typography } from '@mui/material';
import JSZip from 'jszip';



// Define the API endpoints for Pixabay and Pexels
const PIXABAY_API = 'https://pixabay.com/api/';


// Define the base hierarchy of image tags as provided JSON
const baseTags = {
  categories: ['cats', 'dogs', 'animals'],
  // Add more categories and tags as needed
};

// Function to fetch images from the selected API
const fetchImages = async (query, api) => {
  const response = await fetch(`${api}?query=${query}`, {
    headers: {
      Authorization: 'YOUR_API_KEY', // Replace with your actual API key
    },
  });
  const data = await response.json();
  return data;
};


const ImageCollectionApp = () => {


    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [zipFile, setZipFile] = useState(null);
  
    // Fetch images based on the selected category
    const { data: imagesData, status } = useQuery(['images', selectedCategory], () => fetchImages(selectedCategory, PIXABAY_API));
  
    // Function to handle image selection
    const handleImageSelect = (image) => {
      setSelectedImages([...selectedImages, image]);
    };
  
    // Function to handle saving the results to a ZIP file
    const handleSaveResults = () => {
      // Implement logic to convert data and create a ZIP file
      // This is a simplified example, you may need to adjust it based on your requirements
      const contentMetadata = selectedImages.map((image, index) => ({
        id: `image_${index}`,
        labels: ['cat'], // Assuming 'cat' is always a label
        weight: 1,
        url: image.url,
        author: image.author,
        tags: image.tags,
      }));
  
      const zip = new JSZip();
      zip.file('content.json', JSON.stringify(contentMetadata));
  
      const imagesFolder = zip.folder('images');
      selectedImages.forEach((image, index) => {
        imagesFolder.file(`image_${index}.png`, image.imageData, { base64: true });
      });
  
      zip.generateAsync({ type: 'blob' }).then((blob) => {
        setZipFile(blob);
      });
    };


  return (
    <Container>
    <Typography variant="h4" gutterBottom>
      Image Collection App
    </Typography>
    {status === 'loading' && <p>Loading images...</p>}
    {status === 'error' && <p>Error loading images</p>}
    {status === 'success' && (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Select Category"
            select
            fullWidth
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {baseTags.categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Select Images for {selectedCategory}
          </Typography>
          <Grid container spacing={2}>
            {imagesData.hits.map((image) => (
              <Grid item key={image.id}>
                <img
                  src={image.webformatURL}
                  alt={image.tags}
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                  onClick={() => handleImageSelect(image)}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleSaveResults}>
            Save Results
          </Button>
        </Grid>
      </Grid>
    )}
    {zipFile && (
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="secondary"
          href={URL.createObjectURL(zipFile)}
          download="image_collection.zip"
        >
          Download ZIP File
        </Button>
      </Grid>
    )}
  </Container>
  )
}

export default ImageCollectionApp