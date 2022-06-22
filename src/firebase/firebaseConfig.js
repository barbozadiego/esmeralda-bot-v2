import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc, setDoc } from "firebase/firestore";
// import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
// export const storage = getStorage();


export const addDollarBCV = async (price) => {
    const BCV = await setDoc(doc(db, "exchanges-rates", "BCV"), price);
    return BCV
}

export const getDollarBCV = async () => {
    const bcvRef = doc(db, "exchanges-rates", "BCV")
    const priceBCV = await getDoc(bcvRef);             

    console.log(priceBCV.data())
    return priceBCV.data()
}

export const getProducts = async () => {
        const productsRef = collection(db, "products")
        const products = await getDocs(productsRef);             

        let data = []
        products.forEach((doc) => {
            let document = doc.data()
                document.id = doc.id

            data.push(document)
        });
        console.log(data)
        return data
}