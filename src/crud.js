import { useState, useEffect } from "react";
import { db } from './fbconfig'; 
import { addDoc, collection, getDocs, deleteDoc, doc, updateDoc} from 'firebase/firestore'; 

function CRUD() {
  const [dataItem, setDataItem] = useState("");
  const [dataScpClass, setDataClass] = useState("");
  const [dataDescription, setDataDescription] = useState("");
  const [dataContainment, setDataContainment] = useState("");
  const [readData, setReadData] = useState([]);
  const [id, setId] = useState("");
  const [showDoc, setShowDoc] = useState(false);
  const OurCollection = collection(db, "subjects");

//CRUD Create functionality
  const crudCreate = async () => {
    try {
      await addDoc(OurCollection, {
        Item: dataItem,
        scpClass: dataScpClass, 
        description: dataDescription,
        containment: dataContainment
      });

      // Clear input fields after successful create
      setDataItem("");
      setDataClass("");
      setDataDescription("");
      setDataContainment("");
    } catch (error) {
      console.error("Error creating document:", error);
    }
  }

  //CRUD delete functionality
  const crudDelete = async (id) => {
    const docToDelete = doc(db, "subjects", id);
    await deleteDoc(docToDelete);
  }

  //CRUD Update/Edit Functionality
  const crudUpdate = async () => {
   const updateData = doc(db, "subjects", id);
   await updateDoc(updateData, {item:dataItem, scpClass:dataScpClass, description:dataDescription, containment:dataContainment })
  }

  const showEdit = async (id, item, scpClass, description, containment) =>{
    setDataItem(item);
    setDataClass(scpClass);
    setDataDescription(description);
    setDataContainment(containment);
    setId(id);
    setShowDoc(true);
    
  }
 

  

  useEffect(() => {
    const getData = async () => {
      try {
        const ourDocsToRead = await getDocs(OurCollection);
        const sortedData = ourDocsToRead.docs.map(doc => ({ ...doc.data(), id: doc.id })).sort((a, b) => a.Item.localeCompare(b.Item));
        setReadData(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    getData();
  }, []); 

  return (
    <>
      <input value={dataItem} onChange={(item) => setDataItem(item.target.value)} placeholder="Item" />
      <br />
      <br />
      <input value={dataScpClass} onChange={(scpClass) => setDataClass(scpClass.target.value)} placeholder="class" /> 
      <br />
      <br />
      <input value={dataDescription} onChange={(description) => setDataDescription(description.target.value)} placeholder="Description" />
      <br />
      <br />
      <input value={dataContainment} onChange={(containment) => setDataContainment(containment.target.value)} placeholder="Containment" />
      <br />
      <br />
      <button onClick={crudCreate}>Create new document</button>
      <button onClick={crudUpdate}>Update Document</button>

      <div>
        <ul>
          {readData.map((item) => (
            <li key={item.id}>
              {item.Item} - {item.scpClass}
              <br />
              Description: {item.description}
              <br />
              Containment: {item.containment}
              <li>
              <button onClick={()=> crudDelete(item.id)}>Delete</button>
              <br />
              <button onClick={()=>showEdit(item.id, item.Item, item.containment, item.description, item.scpClass)}>Edit</button>
              </li>
            </li>
          ))}
          
        </ul>
        
      </div>

      <div>
      </div>
    </>
  )
}

export default CRUD;
