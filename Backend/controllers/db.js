const { collection, addDoc, deleteDoc, updateDoc, getDocs, doc, getDoc } = require("firebase/firestore");
const { db } = require("../config/firebase");

const addProduct = async (req, res) => {
  const { name, price, quantity, Specs, Image, deviceType } = req.body;
  try {
    const docRef = await addDoc(collection(db, "Products"), {
      name: name,
      price: price,
      quantity: quantity,
      Specs: Specs,
      Image: Image,
      deviceType: deviceType
    });
    res.json({
      message: "Added successfully",
    });
  } catch (error) {
    console.log("Adding error", error);
  }
};

const getProducts = async (req, res) => {
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

const createPaidOrder = async (req, res) => {
  const { uid, products, totalAmount, paymentStatus } = req.body;
  try {
    const userRef = doc(db, "users", uid);
    const orderRef = await addDoc(collection(userRef, "bookings"), {
      products: products,
      totalAmount: totalAmount,
      paymentStatus: paymentStatus,
      createdAt: new Date(),
    });

    res.json({
      message: "Order placed successfully",
      orderId: orderRef.id,
    });
  } catch (error) {
    console.log("Error creating paid order", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};
const trackOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    const orderDocRef = doc(db, "Orders", orderId);
    const orderDoc = await getDoc(orderDocRef);

    if (!orderDoc.exists()) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({
      orderId: orderDoc.id,
      ...orderDoc.data(),
    });
  } catch (error) {
    console.log("Error tracking order", error);
    res.status(500).json({ error: "Failed to track order" });
  }
};

module.exports = {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  createPaidOrder,
  trackOrder
};
