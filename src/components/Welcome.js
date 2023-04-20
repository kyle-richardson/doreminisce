import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Welcome = () => {
    const [open, setOpen] = useState(false)

    const handleClose = () => {
        localStorage.setItem('hasVisited', true)
        setOpen(false)
    }

    useEffect(()=> {
      const hasVisited = localStorage.getItem('hasVisited')
      if (!hasVisited) {
        setOpen(true)
      }

    }, [])
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
      >
        <DialogTitle id="dialog-title">Welcome to Do-Re-Minisce</DialogTitle>
        
        <DialogContent>
          <DialogContentText>
            Please excuse the slow load times.  I want to keep this site running for 
            personal and portfolio use, but Heroku started charging for even minimal use, so I 
            switched to Render.com free tier, which has extremely limited backend speeds.
          </DialogContentText>
          <DialogContentText>
            Thanks for your patience, and thanks for checking out my app!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="contained" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
}

export default Welcome