import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const About = () => {
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        setOpen(false)
    }
    const handleOpen = () => {
        setOpen(true)
    }

    return (
        <div className="about-model-container">
            <Button variant="outlined" size="small" onClick={handleOpen}>What is this?</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
      >
        <DialogTitle id="dialog-title">About Do-Re-Minisce</DialogTitle>
        
        <DialogContent>
          <DialogContentText>
            Ever wanted to jump in a time machine and reminisce on the music of the past? Look no further.  
            Simply select a date, and click on a song to play it on Youtube.  Additionally, you can connect to Spotify and create a 
            playlist of the Billboard Hot 100 of the date chosen. Enjoy!
          </DialogContentText>
          <DialogContentText>
            Note: Because we use multiple resources that may code songs differently, there may be some errors in the playlist creation.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>window.open('https://github.com/kyle-richardson/doreminisce')} variant="contained" color="primary">
            View Code
          </Button>
          <Button onClick={handleClose} color="secondary" variant="contained" autoFocus>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    )
}

export default About