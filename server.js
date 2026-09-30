const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

// In-Memory Database (Replace with MongoDB/PostgreSQL in production)
let orders = [];
let orderIdCounter = 1;

/**
 * 1. PLACE AN ORDER
 * POST /api/orders
 */
app.post('/api/orders', (req, res) => {
    const { items, subtotal, deliveryFee, total, customerName, address } = req.body;

    if (!items || items.length === 0) {
        return res.status(400).json({ error: 'Cart is empty. Cannot place order.' });
    }

    const newOrder = {
        id: orderIdCounter++,
        items,
        subtotal,
        deliveryFee,
        total,
        customerName: customerName || 'Guest User',
        address: address || '123 Main St',
        status: 'placed', // Statuses: 'placed', 'preparing', 'delivered', 'cancelled'
        createdAt: new Date()
    };

    orders.push(newOrder);
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
});

/**
 * 2. CANCEL AN ORDER
 * PATCH /api/orders/:id/cancel
 */
app.patch('/api/orders/:id/cancel', (req, res) => {
    const orderId = parseInt(req.params.id);
    const order = orders.find(o => o.id === orderId);

    if (!order) {
        return res.status(404).json({ error: 'Order not found.' });
    }

    // Check if order is already delivered or cancelled
    if (order.status === 'delivered') {
        return res.status(400).json({ error: 'Cannot cancel an order that has already been delivered.' });
    }

    if (order.status === 'cancelled') {
        return res.status(400).json({ error: 'Order is already cancelled.' });
    }

    order.status = 'cancelled';
    order.cancelledAt = new Date();

    res.json({ message: 'Order cancelled successfully', order });
});

/**
 * 3. GET ORDER CANCELLATION RATE & METRICS
 * GET /api/metrics/cancellation-rate
 */
app.get('/api/metrics/cancellation-rate', (req, res) => {
    const totalOrders = orders.length;

    if (totalOrders === 0) {
        return res.json({
            totalOrders: 0,
            cancelledOrders: 0,
            cancellationRatePercentage: '0.00%'
        });
    }

    const cancelledOrders = orders.filter(o => o.status === 'cancelled').length;
    const cancellationRate = (cancelledOrders / totalOrders) * 100;

    res.json({
        totalOrders,
        activeOrders: totalOrders - cancelledOrders,
        cancelledOrders,
        cancellationRatePercentage: `${cancellationRate.toFixed(2)}%`
    });
});

/**
 * 4. GET ALL ORDERS (Optional utility)
 * GET /api/orders
 */
app.get('/api/orders', (req, res) => {
    res.json(orders);
});

// Start Server
app.listen(PORT, () => {
    console.log(`FoodDash Backend running on http://localhost:${PORT}`);
});