import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const PopupModal = ({playlistURL, openModal, handleCloseModal, notFoundList, failedPlaylistCreate}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleViewPlaylist = () => {
    handleCloseModal()
    window.open(playlistURL, "_blank")
  }

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{failedPlaylistCreate ? "Failed to create Playlist" : "Playlist Created"}</DialogTitle>
        {failedPlaylistCreate && 
        <DialogContent>
          <DialogContentText>
          Something went wrong.  Sorry about that.  Please try again.  If it fails again, we may have reached some limits connecting to Spotify's services. If that is the case, try back in a few hours.  In the mean time, feel free to select individual songs to play on Youtube.
          </DialogContentText>
        </DialogContent>
        }
        <DialogContent>
          <DialogContentText>
          Note: Because we use multiple resources that store song metadata slightly different from each other, there may be some errors in the playlist creation.
          </DialogContentText>
          {notFoundList.length > 0 && !failedPlaylistCreate && 
            <div style={{display: "flex", flexDirection: "column"}}>
                <DialogContentText>
                    We were not able to locate the following songs in Spotify.  Consider looking for the missing songs and adding to the playlist manually:
                </DialogContentText>
                {notFoundList.map(item => <p key={item.rank}>{`${item.rank}. ${item.title} - ${item.artist}`}</p>)}
            </div>
          }
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCloseModal} variant="contained" color="primary">
            Close
          </Button>
          {!failedPlaylistCreate && <Button onClick={handleViewPlaylist} color="secondary" variant="contained" autoFocus>
            View Playlist
          </Button>}
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PopupModal