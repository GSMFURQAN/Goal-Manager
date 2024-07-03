import React, { useState, useEffect } from "react";
// import { storage } from './firebaseConfig';
// import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Button, Modal, Box, Chip, Grid, Typography } from "@mui/material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectView } from "../../redux/generalSlice";

const ImageGrid = ({ media}) => {
    const dispatch = useDispatch()
  const [openPreview, setOpenPreview] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
const general = useSelector((state)=>state.general)
  const handlePreview = (item) => {
    setSelectedMedia(item);
    setOpenPreview(true);
  };
  return (
    <div>
    <Modal open={general.imageGridModal} onClose={()=>dispatch(selectView({...general, imageGridModal : false}))}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { lg: "40vw", xs: "85vw" },
            bgcolor: "background.paper",
            border: "2px solid #000",
            borderRadius: "12px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Grid container spacing={2} style={{ marginTop: 20 }}>
            {media?.map((item) => (
              <Grid item key={item} xs={12} sm={6} md={4}>
                <Button onClick={() => handlePreview(item)}>
                  <img
                    src={item}
                    alt={item}
                    style={{ width: "100%", height: "auto" }}
                  />
                </Button>
                {/* <Chip
                  label={item.fileType === "application/pdf" ? "PDF" : "Image"}
                /> */}
              </Grid>
            ))}
          </Grid>
        </Box>
      </Modal>
      <Modal open={openPreview} onClose={()=>setOpenPreview(false)}>
      <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { lg: "40vw", xs: "85vw" },
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            {/* {media && media.fileType === 'application/pdf' ? (
              <iframe src={selectedMedia.url} width="100%" height="600px" title="PDF Preview"></iframe>
          ) : ( */}
            <img
              src={selectedMedia}
              alt={"selectedMedia"}
              style={{ width: "100%", height: "auto" }}
            />
            {/* )} */}
            {/* <Typography variant="h6" component="h2">
            {selectedMedia ? selectedMedia.fileName : ''}
          </Typography> */}
          </Box>
      </Modal>
    </div>
  );
};

export default ImageGrid;
