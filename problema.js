import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import { Link } from "react-router-dom";
import conexionAxios from "../../config/axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: "none",
  },
}));

export default function CargarDocumentos() {
  const classes = useStyles();

  const [data, setData] = useState([]);
  const [archivo, guardarArchivo] = useState("");
  const peticionGet = async (e) => {

    await conexionAxios.get("/documentosIniciales").then((response) => {
      setData(response.data);
    });
  };

  useEffect(async () => {
    await peticionGet();
  }, []);


  const leerArchivo = (e) => {
    guardarArchivo(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("documentos", archivo);
    await conexionAxios
      .post("/inicioPasantia", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
      });
  };

  return (
    <Container fixed>
      <Typography component="div" style={{ height: "100vh" }}>
        <Typography variant="h6">Cargar documentos</Typography>
        <form onSubmit={handleSubmit} >
          <Table>
            <TableBody>
              {data.map((documentos) => {
                return (
                  <TableRow>
                    <TableCell>
                      <Typography variant="h6">
                        {documentos.documento}:
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <TextField
                        autoComplete="fname"
                        name={documentos.documento}
                        variant="outlined"
                        type="file"
                        required
                        fullWidth
                        id="file"
                        autoFocus
                        onChange={leerArchivo}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <h6>
            los archivos deben estar en formato pdf y no superar los 5mb de
            tamaño
          </h6>
          <br></br>
          <Grid item>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Cargar documentos
          </Button>
          </Grid>
        </form>
      </Typography>
    </Container>
  );
}
