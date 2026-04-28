import React, { useState, useCallback, memo, useMemo } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Modal,
    StyleSheet,
    SafeAreaView
} from 'react-native';

// 1. Memoized Item Component to prevent re-renders of the whole list
const OrderItem = memo(({ item, onPress }) => (
    <TouchableOpacity
        style={styles.item}
        onPress={() => onPress(item)}
        activeOpacity={0.7}
    >
        <Text style={styles.bold}>#{item.orderNo} - {item.type}</Text>
        <Text>{item.name} | {item.mobile}</Text>
        <Text>Total: ${item.total}</Text>
    </TouchableOpacity>
));

const OptimizedOrderList = () => {
    const [selectedOrder, setSelectedOrder] = useState(null);

    // 2. Sample data memoized (usually this comes from props or API)
    const orders = useMemo(() => [
        { id: '1', orderNo: '101', type: 'Delivery', name: 'John Doe', mobile: '1234567890', total: 25.00, details: 'Large Pizza, Garlic Knots' },
        { id: '2', orderNo: '102', type: 'Pickup', name: 'Jane Smith', mobile: '0987654321', total: 15.50, details: 'Pasta, Coke' },
        { id: '3', orderNo: '103', type: 'Delivery', name: 'Bob Ross', mobile: '555000111', total: 40.00, details: 'Salad, Steak' },
    ], []);

    // 3. Callback memoized to maintain referential identity
    const handlePress = useCallback((item) => {
        setSelectedOrder(item);
    }, []);

    const closeModal = useCallback(() => {
        setSelectedOrder(null);
    }, []);

    // 4. Optimization: renderItem function defined outside or via useCallback
    const renderItem = useCallback(({ item }) => (
        <OrderItem item={item} onPress={handlePress} />
    ), [handlePress]);

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={orders}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                // 5. FlatList Optimizations
                removeClippedSubviews={true}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={5}
            />

            <Modal
                visible={!!selectedOrder}
                transparent
                animationType="none"
                onRequestClose={closeModal}
            >
                <View style={styles.overlay}>
                    <View style={styles.modal}>
                        <Text style={styles.title}>Order Details</Text>
                        {selectedOrder && (
                            <>
                                <Text>Items: {selectedOrder.details}</Text>
                                <Text style={styles.mt}>Contact: {selectedOrder.mobile}</Text>
                            </>
                        )}
                        <TouchableOpacity style={styles.btn} onPress={closeModal}>
                            <Text style={styles.btnText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    item: { padding: 15, borderBottomWidth: 1, borderColor: '#eee' },
    bold: { fontWeight: 'bold', fontSize: 16 },
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', padding: 20 },
    modal: { backgroundColor: 'white', padding: 20, borderRadius: 8 },
    title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    mt: { marginTop: 10 },
    btn: { marginTop: 20, backgroundColor: '#007AFF', padding: 10, borderRadius: 5, alignItems: 'center' },
    btnText: { color: '#fff', fontWeight: 'bold' }
});

export default OptimizedOrderList;