import './preStart'; // Must be the first import
import app from './Server';
import mongoose, {Connection} from 'mongoose';

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);

/**
 * THIS IS USED FOR TESTING LOCALLY
 */
// Start the server
const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
    console.info('Express server started on port: ' + port);
});
