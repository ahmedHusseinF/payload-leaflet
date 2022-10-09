import { CollectionConfig } from 'payload/types';

import LeafletEditField from '../components/leafletEditComponent';

// Example Collection - For reference only, this must be added to payload.config.ts to be used.
const Examples: CollectionConfig = {
  slug: 'example',
  fields: [
    {
      name: 'location',
      type: 'point',
      admin: {
        components: {
          Field: LeafletEditField,
        },
      },
    },
  ],
};

export default Examples;
