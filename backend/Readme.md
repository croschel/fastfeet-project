# BackEnd FastFeet

## Routes

### Sessions - SignIn on Web App and Mobile App

- method: `post`, route: `/auth`;
- method: `post`, route: `/auth/transporter`

### Orders with Problems for Transporters

- method: `get`, route: `/order/:order_id/problems`

### Orders for Transporters
- method: `get`, route: `/transporter/:id/orders`

- method: `get`, route: `/transporter/:id/ordered`

- method: `put`, route: `/transporter/:transporter_id/order/:order_id`

- method: `put`, routes: `/transporter/:transporter_id/ordered/:order_id`

- method: `post`, routes: `/orders/:order_id/problems`

### Insert Files (signature)

- method: `post`, route: `/signatures`,     middleware: `uploadSignature.single('file')`
);

## Routes that is resquired authentication

### Recipients
- method:` post`, route: `/recipients`
- method: `put`, route:` /recipients/:id`
- method: `get`, route: `/recipients/id`
- method: `get`, route: `/recipients`
- method: `delete`, route: `/recipients/:id`

### Transporters
- method: `post`, route: `/transporters`'
- method: `get`, route: `/transporters`'
- method: `put`, route: `/transporters/:id`'
- method: `get`, route: `/transporters/:id`'
- method: `delete`, route: `/transporters/:id`',

### Insert Files (avatar)
- method: `post`, route: `/files`, middleware : `uploadAvatar.single('file')`

### Orders
- method: `post`, route: `/orders`'
- method: `get`, route: `/orders`'
- method: `put`, route: `/orders/:id`
- method: `get`, route: `/orders/:id`
- method: `delete`, route: `/orders/:id`

### Notification
- method: `put`, route: `/notifications/:id`

### Problems
- method: `get`, route: `/problems`
- method: `put`, route: `/problem/:id/cancel-order`
