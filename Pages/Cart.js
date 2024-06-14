// import React from 'react';
// import { ScrollView, Text, View, Button, StyleSheet } from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import { Card } from "@rneui/base";
// import { removeFromCart } from '../Store/Actions/CartActions';

// export default function Cart() {
//     const cartItems = useSelector((state) => state.cartReducer.cart);
//     const dispatch = useDispatch();

//     const handleRemoveFromCart = (id) => {
//         dispatch(removeFromCart(id));
//     };
//     const calculateTotal = () => {
//         return cartItems.reduce((total, item) => total + item.price, 0);
//     };

//     return (
//         <ScrollView>
//             <Text>Cart</Text>
//             <View style={{display:"flex"}}>
//                 {cartItems.map((item, index) => (
//                     <Card key={index}>
//                         <Card.Title>{item.title}</Card.Title>
//                         <Card.Divider />
//                         <Card.Image style={{width:300, height:300}}
//                             source={{ uri: item.images[0] }} />
//                         <Button title="Remove from Cart" onPress={() => handleRemoveFromCart(item.id)} />
//                     </Card>
//                 ))}
//             </View>
//             <View style={styles.totalContainer}>
//                 <Text style={styles.totalText}>Total: ${calculateTotal().toFixed(2)}</Text>
//             </View>
//         </ScrollView>
//     );
// }

// const styles = StyleSheet.create({
//     header: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         textAlign: 'center',
//         marginVertical: 10,
//     },
//     totalContainer: {
//         margin: 20,
//         padding: 10,
//         backgroundColor: '#f8f8f8',
//         borderRadius: 10,
//         alignItems: 'center',
//     },
//     totalText: {
//         fontSize: 20,
//         fontWeight: 'bold',
//     },
//     icon: {
//         color: 'red',
//         fontSize: 40,
//         alignItems: 'center',
//     },
//     darkIcon: {
//         color: 'black',
//         fontSize: 40,
//         alignItems: 'center',
//     }
// });
import React, { useState } from 'react';
import { ScrollView, Text, View, Button, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "@rneui/base";
import { removeFromCart } from '../Store/Actions/CartActions';

export default function Cart() {
    const cartItems = useSelector((state) => state.cartReducer.cart);
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);

    const confirmRemoveFromCart = (id) => {
        setSelectedItemId(id);
        setModalVisible(true);
    };

    const handleRemoveFromCart = () => {
        if (selectedItemId !== null) {
            dispatch(removeFromCart(selectedItemId));
            setModalVisible(false);
            setSelectedItemId(null);
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price, 0);
    };

    return (
        <ScrollView>
            <Text style={styles.header}>Cart</Text>
            <View style={{ display: "flex" }}>
                {cartItems.map((item, index) => (
                    <Card key={index}>
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Divider />
                        <Card.Image style={{ width: 300, height: 300 }}
                            source={{ uri: item.images[0] }} />
                        <Button title="Remove from Cart" onPress={() => confirmRemoveFromCart(item.id)} />
                    </Card>
                ))}
            </View>
            <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Total: ${calculateTotal().toFixed(2)}</Text>
            </View>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Are you sure you want to remove this item from the cart?</Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonCancel]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonConfirm]}
                            onPress={handleRemoveFromCart}
                        >
                            <Text style={styles.textStyle}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    totalContainer: {
        margin: 20,
        padding: 10,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        alignItems: 'center',
    },
    totalText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    icon: {
        color: 'red',
        fontSize: 40,
        alignItems: 'center',
    },
    darkIcon: {
        color: 'black',
        fontSize: 40,
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        marginHorizontal: 10,
    },
    buttonCancel: {
        backgroundColor: '#f8d7da',
    },
    buttonConfirm: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
