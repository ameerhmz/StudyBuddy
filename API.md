# 🔌 API Documentation

This document describes the backend API endpoints for StudyBuddy.

## Base URL
```
http://localhost:3001 (development)
```

## Real-time Events (Socket.io)

### Connection
```javascript
const socket = io('http://localhost:3001');
```

### Group Chat Events

#### Join Group
```javascript
socket.emit('join_group', groupId);
```

#### Send Message
```javascript
socket.emit('send_message', {
  groupId: 'group123',
  message: 'Hello everyone!',
  sender: 'user123',
  timestamp: new Date().toISOString()
});
```

#### Receive Messages
```javascript
socket.on('receive_message', (data) => {
  console.log('New message:', data);
  // data: { groupId, message, sender, timestamp, messageId }
});
```

#### User Joined
```javascript
socket.on('user_joined', (data) => {
  console.log('User joined:', data);
  // data: { groupId, userId, username, timestamp }
});
```

#### User Left
```javascript
socket.on('user_left', (data) => {
  console.log('User left:', data);
  // data: { groupId, userId, username, timestamp }
});
```

### Connection Events

#### Connect
```javascript
socket.on('connect', () => {
  console.log('Connected to server');
});
```

#### Disconnect
```javascript
socket.on('disconnect', () => {
  console.log('Disconnected from server');
});
```

## HTTP Endpoints

### Health Check
```http
GET /
```
**Response:**
```json
{
  "status": "StudyBuddy Server is running",
  "timestamp": "2025-10-21T10:30:00.000Z",
  "version": "1.0.0"
}
```

## Error Handling

All API errors follow this format:
```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "timestamp": "2025-10-21T10:30:00.000Z"
}
```

## Rate Limiting

- WebSocket connections: No explicit limit
- HTTP requests: Basic rate limiting may be implemented in production

## Authentication

Currently, authentication is handled on the frontend. Future versions may include:
- JWT token authentication
- Session management
- API key authentication for external integrations

## Data Models

### Message
```typescript
interface Message {
  id: string;
  groupId: string;
  sender: string;
  content: string;
  timestamp: string;
  type: 'text' | 'system';
}
```

### User
```typescript
interface User {
  id: string;
  username: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away';
}
```

### Group
```typescript
interface Group {
  id: string;
  name: string;
  members: string[];
  createdAt: string;
  lastActivity: string;
}
```

## Development

### Starting the Server
```bash
npm run server
```

### Environment Variables
```env
NODE_ENV=development
PORT=3001
```

### Testing WebSocket Connection
```javascript
// Test connection
const socket = io('http://localhost:3001');
socket.on('connect', () => console.log('Connected!'));

// Test group chat
socket.emit('join_group', 'test-group');
socket.emit('send_message', {
  groupId: 'test-group',
  message: 'Test message',
  sender: 'test-user'
});
```

## Deployment

### Production Considerations
- Use environment variables for configuration
- Implement proper logging
- Add monitoring and health checks
- Configure CORS properly
- Use a process manager (PM2, Docker)
- Set up load balancing for multiple instances

### Docker Support
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3001
CMD ["npm", "run", "server"]
```

## Security

- Input validation and sanitization
- Rate limiting for abuse prevention
- CORS configuration
- Secure WebSocket connections (wss:// in production)
- Environment variable protection

## Monitoring

### Health Checks
```bash
curl http://localhost:3001/health
```

### Logs
Server logs are output to console and can be captured by your deployment platform.

## Troubleshooting

### Common Issues

1. **Connection Refused**
   - Ensure server is running on correct port
   - Check firewall settings
   - Verify CORS configuration

2. **Messages Not Received**
   - Check if user is in the correct group
   - Verify WebSocket connection status
   - Check browser console for errors

3. **Performance Issues**
   - Monitor server resources
   - Check for memory leaks
   - Implement connection limits if needed

## Future Enhancements

- User authentication and authorization
- Message persistence (database integration)
- File sharing capabilities
- Voice/video chat integration
- Message encryption
- Admin controls and moderation
- Analytics and usage tracking