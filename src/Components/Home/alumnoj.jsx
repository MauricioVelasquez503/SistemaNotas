import { firestore } from "firebase";
import React, {useState, useEffect} from "react";
import Alumno from "./Alumno";
import { toast } from "react-toastify";
import Swal from 'sweetalert2';


const Alumnoj = () =>
{ 
  var db = new firestore();
  const [Alumnos, setAlumnos] = useState([]);
  const [currentId, setCurrentId] = useState("");
  var  promAlumnos;
  
  

  const getAlumnos = async () => {
    db.collection("alumno").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setAlumnos(docs);
      console.log("alumnos",docs);
     
      let total = docs.length;
      let suma=0;
    
      docs.map(resp=>{

       suma+=(parseInt(resp.prom));
        
      });
      let promtotal=0;

      promtotal=suma/total;
      console.log(promtotal);
      document.getElementById("promediototal").innerHTML="Promedio Global: "+promtotal;
    });
  };


  const onDeleteAlumno = async (id) => {
   // if (window.confirm("are you sure you want to delete this Alumno?")) {
      //
      Swal.fire({
        title: 'Estas seguro que deseas Eliminar el registro?',
        showDenyButton: true,
        
        confirmButtonText: `Eliminar`,
        denyButtonText: `Cancelar`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          db.collection("alumno").doc(id).delete();
          Swal.fire('Registro se ha eliminado correctamente', '', 'success');
        } else if (result.isDenied) {
          Swal.fire('No se elimino El Registro', '', 'info');
        }
      });
    
  };

  useEffect(() => {
    getAlumnos();
  }, []);

  const addOrEditAlumno = async (AlumnoObject) => {
  
    try {
      AlumnoObject.prom=( (parseInt( AlumnoObject.nota1)+parseInt(AlumnoObject.nota2)+parseInt(AlumnoObject.nota3)+parseInt(AlumnoObject.nota4)+parseInt(AlumnoObject.nota5))/5);

      if(AlumnoObject.prom>=7)
      {
        AlumnoObject.aprobado="Aprobado";
        
      }

      else if(AlumnoObject.prom>=4 && AlumnoObject.prom<=7 )
      {
        AlumnoObject.aprobado="Regular";
      }
      else
      {
        AlumnoObject.aprobado="Reprobado";
      }

      if (currentId === "") {
        await db.collection("alumno").doc().set(AlumnoObject);
        console.log(AlumnoObject);
         
        Swal.fire({
      
          icon: 'success',
          title: 'Registro Ingresado con exito',
          showConfirmButton: false,
         
        })

        
      } else {
        await db.collection("alumno").doc(currentId).update(AlumnoObject);
        toast("Se actualizo un Alumno", {
          type: "info",
        });
        setCurrentId("");
        
      }
    } catch (error) {
      console.error(error);
    }
  };


    return (
      <div className="container ">
        <div className="row">
          <div className="jumbotron">
            <div className="container">
              <h1 className="display-3">Ingreso de Alumnos</h1>
             <hr/>
             <br/>
             <br/>
             <br/>

              <Alumno {...{ addOrEditAlumno, currentId, Alumnos }} />
              <hr/>
              <br/>
             
            </div>
            <div className="row">
              <div className="col-12">
                <h3 id="promediototal" className="h3">
                  {" "}
                </h3>
                <table className="table table-striped text-center ">
                  <thead className="thead-dark">
                    <tr>
                      <th className="text-center" scope="col">
                        #
                      </th>
                      <th className="text-center" scope="col">
                        Nombre
                      </th>
                      <th className="text-center" scope="col">
                        Apellido
                      </th>

                      <th className="text-center" scope="col">
                        Nota 1
                      </th>
                      <th className="text-center" scope="col">
                        Nota 2
                      </th>
                      <th className="text-center" scope="col">
                        Nota 3
                      </th>
                      <th className="text-center" scope="col">
                        Nota 4
                      </th>
                      <th className="text-center" scope="col">
                        Nota 5
                      </th>
                      <th className="text-center" scope="col">
                        Promedio
                      </th>
                      <th className="text-center" scope="col">
                        Estado
                      </th>
                      <th className="text-center" scope="col">
                        Accion
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Alumnos.map((Alumno) => (
                      <tr key={Alumno.id}>
                        <td></td>
                        <td >{Alumno.nombre}</td>
                        <td>{Alumno.apellido}</td>
                        <td>{Alumno.nota1}</td>
                        <td>{Alumno.nota2}</td>
                        <td>{Alumno.nota3}</td>
                        <td>{Alumno.nota4}</td>
                        <td>{Alumno.nota5}</td>
                        <td>{Alumno.prom}</td>
                        <td
                          className={
                            "badge" +
                            (Alumno.aprobado === "Aprobado"
                              ? " badge-primary"
                              : " badge-danger")+" mt-4"
                          }
                        >
                          {Alumno.aprobado}
                        </td>

                        <td>
                          <button
                            className="btn btn-primary"
                            onClick={() => setCurrentId(Alumno.id)}
                          >
                            Editar
                          </button>
                          &nbsp; &nbsp;
                          <button
                            className="btn btn-danger"
                            onClick={() => onDeleteAlumno(Alumno.id)}
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

}
export default Alumnoj