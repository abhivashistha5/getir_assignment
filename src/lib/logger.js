import tracer from 'tracer';
import config from '../config';

export default tracer.colorConsole({ level: config.logging.level });
