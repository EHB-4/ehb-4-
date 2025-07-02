// Mock MongoDB client for frontend development
const mockClient = {
  db: () => ({
    collection: name => ({
      find: () => ({
        toArray: () => Promise.resolve([]),
      }),
      findOne: () => Promise.resolve(null),
      insertOne: () => Promise.resolve({ insertedId: 'mock-id' }),
      updateOne: () => Promise.resolve({ modifiedCount: 1 }),
      deleteOne: () => Promise.resolve({ deletedCount: 1 }),
      aggregate: () => ({
        toArray: () => Promise.resolve([]),
      }),
    }),
  }),
  close: () => Promise.resolve(),
};

const clientPromise = Promise.resolve(mockClient);

export default clientPromise;
