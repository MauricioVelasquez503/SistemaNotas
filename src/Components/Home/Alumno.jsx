import { firestore } from "firebase";
import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';

const Alumno = (props) => {
  var db = new firestore();
  const initialStateValues = {
    nombre: "",
    apellido: "",
    nota1: "",
    nota2: "",
    nota3: "",
    nota4: "",
    nota5: "",
    prom: "",
    aprobado: "",
  };
  //

  //

  const [values, setValues] = useState(initialStateValues);
  //

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    if((document.getElementById('nota1').value >= 0 && document.getElementById('nota1').value <=10  )&&
      (document.getElementById('nota2').value >= 0 && document.getElementById('nota2').value <=10  )&&
      (document.getElementById('nota3').value >= 0 && document.getElementById('nota3').value <=10  )&&
      (document.getElementById('nota4').value >= 0 && document.getElementById('nota4').value <=10  )&&
      (document.getElementById('nota5').value >= 0 && document.getElementById('nota5').value <=10  ))
      {

        props.addOrEditAlumno(values);
        setValues({ ...initialStateValues });

      }

      else 
      {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Solo de aceptan numeros mayores o iguales 0 y menores o iguales a 10',
        });
      }


   
  };

  const getAlumnoById = async (id) => {
    const doc = await db.collection("Alumno").doc(id).get();
    setValues({ ...doc.data() });
  };

  useEffect(() => {
    if (props.currentId === "") {
      setValues({ ...initialStateValues });
    } else {
      //https://stackoverflow.com/questions/56059127/how-to-fix-this-error-function-collectionreference-doc
      if (props.currentId !== null && props.currentId !== undefined) {
        getAlumnoById(props.currentId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentId]);

  return (
    <div className="container">
      <div className="row">
        <div className="form-group row">
          <form autoComplete="off" onSubmit={handleSubmit}>
                              <div className="row">
                                <div className="form-group col-sm-6">
                                  <label htmlFor="exampleInputEmail1">Ingrese Nombre:</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={values.nombre}
                                    name="nombre"
                                    onChange={handleInputChange}
                                  
                                  />
                                </div>

                                <div className="form-group col-sm-6">
                                  <label htmlFor="exampleInputEmail1">Ingrese Apellido:</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    value={values.apellido}
                                    name="apellido"
                                    onChange={handleInputChange}
                                  />
                                </div>
                               </div>
              <div className="row">
              <div className="form-group col-2">
                <label htmlFor="exampleInputEmail1">Ingrese Nota 1:</label>
                <input
                  type="number"
                  
                  className="form-control"
                  value={values.nota1}
                  name="nota1"
                  id="nota1"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-2">
                <label htmlFor="exampleInputEmail1">Ingrese Nota 2:</label>
                <input
                  type="number"
                  className="form-control"
                  value={values.nota2}
                  name="nota2"
                  id="nota2"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-2">
                <label htmlFor="exampleInputEmail1">Ingrese Nota 3.</label>
                <input
                  type="number"
                  className="form-control"
                  value={values.nota3}
                  name="nota3"
                  id="nota3"
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group col-2">
                <label htmlFor="exampleInputEmail1">Ingrese Nota 4:</label>
                <input
                  type="number"
                  className="form-control"
                  value={values.nota4}
                  name="nota4"
                  id="nota4"
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group col-2">
                <label htmlFor="exampleInputEmail1">Ingrese Nota 5:</label>
                <input
                  type="number"
                  className="form-control"
                  value={values.nota5}
                  name="nota5"
                  id="nota5"
                  onChange={handleInputChange}
                />
              </div>

              <div className=" mb-1 form-group col-2">
              <br />
              <button value="guardar" type="submit" className="btn btn-primary">
                {props.currentId === "" ? "Guardar" : "Actualizar"}
                
              </button>
            </div>
            
              </div>
            
            
          </form>
        </div>
      </div>
    </div>
  );
};
export default Alumno;
