const { collection, addDoc, deleteDoc, updateDoc, getDocs, doc, getDoc } = require("firebase/firestore");
const { db } = require("../config/firebase");


const addProduct= async (req, res) => {
  const { name, price, quantity, Specs, Image, deviceType } = req.body;
  try {
    const docRef = await addDoc(collection(db, "Products"), {
      name:name,
      price:price,
      quantity:quantity,
      Specs:Specs,
      Image:Image,
      deviceType:deviceType      
    });
    res.json({
      message: "Added successfully",
    });
  } catch (error) {
    console.log("Adding  error", error);
  }
};
const getProducts= async (req, res) => {
  try {
    const querySnapshot = await getDocs(collection(db, "Products"));
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.json({
      data: data,
    });
  } catch (error) {
    console.log("Error in getting Products ", error);
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const employeeDocRef = doc(db, "Products", id);
    await deleteDoc(employeeDocRef);
    res.json({
      message: "Employee successfully deleted",
    });
  } catch (error) {
    console.log("Error in deleting product", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
};



const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { price, Specs, quantity } = req.body;

    if (!price || !Specs || !quantity) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const productDocRef = doc(db, "Products", id);
    const productDoc = await getDoc(productDocRef);

    // Check if the document exists
    if (!productDoc.exists()) {
      return res.status(404).json({ message: "Product not found" });
    }

    await updateDoc(productDocRef, {
      price,
      Specs,
      quantity
    });

    res.json({
      message: "Product updated successfully",
    });
  } catch (error) {
    console.log("Error in updating product", error);
    res.status(500).json({ error: "Failed to update product" });
  }
};



module.exports = {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct
};