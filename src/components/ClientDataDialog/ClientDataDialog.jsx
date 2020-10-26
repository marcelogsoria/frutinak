import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid'

export default function ClientDataDialog(props) {
  const [nombre, setNombre] = useState(null);
  const [email, setEmail] = useState(null);
  const [telefono, setTelefono] = useState(null);

  const handleChange = (event) => {
    switch (event.target.name) {
      case 'nombre':
        setNombre(event.target.value);
        break;
    
      case 'email':
        setEmail(event.target.value);
        break;

      case 'telefono':
        setTelefono(event.target.value);
        break;

      default:
        break;
    }
  };

  const enviarFormulario = (event) => {
    let result={
      result:true,
      name:nombre,
      phone:telefono,
      email:email,
    }
    props.handleClose(result)
  }

  const cancelarFormulario = (event) => {
    let result={
      result:false,
      name:null,
      phone:null,
      email:null,
    }
    props.handleClose(result)
  }

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Sólo un paso más...</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Te pedimos algunos datos para finalizar la compra.
          </DialogContentText>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                id="nombre"
                name="nombre"
                label="Nombre"
                // defaultValue="Hello World"
                variant="outlined"
                value={nombre}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                id="email"
                name="email"
                label="Email"
                // defaultValue="Hello World"
                variant="outlined"
                value={email}    
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                required
                id="telefono"
                name="telefono"
                label="Teléfono"
                // defaultValue="Hello World"
                variant="outlined"
                value={telefono}
                onChange={handleChange}
              />
            </Grid>
          </Grid>

        </DialogContent>
        <DialogActions>
          <Button name="enviar" onClick={enviarFormulario} color="primary">
            Guardar
          </Button>
          <Button onClick={cancelarFormulario} color="secondary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}