import { buildConfig } from 'payload/config';
import path from 'path';
import Example from './collections/Examples';
import Users from './collections/Users';

export default buildConfig({
  serverURL: 'http://localhost:3300',
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    // Add Collections here
    Example,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
});
