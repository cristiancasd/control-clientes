rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /clientes/{document=**} {
      allow read, write: if
          request.auth != null;
    }
    match /configuracion/{document=**} {
      allow read, write: if
          request.time < timestamp.date(2022, 4, 9);
    }
  }
}