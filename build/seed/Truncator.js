"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteQueryBatch = deleteQueryBatch;

async function deleteQueryBatch(db, query, resolve) {
  const snapshot = await query.get();
  const batchSize = snapshot.size;

  if (batchSize === 0) {
    // When there are no documents left, we are done
    resolve();
    return;
  } // Delete documents in a batch


  const batch = db.batch();
  snapshot.docs.forEach(doc => {
    batch.delete(doc.ref);
  });
  await batch.commit(); // Recurse on the next process tick, to avoid
  // exploding the stack.

  process.nextTick(() => {
    deleteQueryBatch(db, query, resolve);
  });
}
//# sourceMappingURL=Truncator.js.map