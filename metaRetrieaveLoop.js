 const {google} = require('googleapis');
 const {PubSub} = require('@google-cloud/pubsub');



 const pubsub = new PubSub();
 const subscriptionName = 'mysub';
 const timeout = 5;
 const callAcknowledge = false;
 const subscription = pubsub.subscription(subscriptionName);

 var cloudHealthcare = google.healthcare('v1beta1');

 // const cloudRegion = 'northamerica-northeast1';
 // const projectId = 'centennial-dev';
 // const datasetId = 'AxonDataset7';
 // const dicomStoreId = 'DataStore7';
 // const studyUid = '1.2.392.200046.100.14.233464500781184654070685667316508464174';
 // const seriesUid = '1.2.392.200046.100.14.6811982656493498126896032175776047593220';
 // const instanceUid = '1.2.392.200046.100.14.420525397820872382890175890573871259983';
 // const parent = `projects/${projectId}/locations/${cloudRegion}/datasets/${datasetId}/dicomStores/${dicomStoreId}`;
 // const dicomWebPath = `studies/${studyUid}/series/${seriesUid}/instances/${instanceUid}/metadata`;
 //const request = {parent, dicomWebPath}; this out: /dicomWeb/ and add: /metadata
 // projects/centennial-dev/locations/northamerica-northeast1/datasets/AxonDataset5/dicomStores/AxonDataStore5
 // studies/1.2.392.200046.100.14.233464500781184654070685667316508464174/series/1.2.392.200046.100.14.2526844980248891121826187903895999117670/instances/1.2.392.200046.100.14.29355173405687110581793764945781127392

 function authorize(callback) {
   google.auth.getClient({
             scopes: ['https://www.googleapis.com/auth/cloud-platform']
           }).then(client => {
         callback(client);
       }).catch(err => {
         console.error('authentication failed: ', err);
       });
 }

 function fetchMetaData(parent, dicomWebPath)
 {
     authorize(function(authClient) {
         var request = {
             // The name of the DICOM store that is being accessed (e.g.,
             // `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`).
             parent: parent,  // TODO: Update placeholder value.

             // The path of the RetrieveInstanceMetadata DICOMweb request (e.g.,
             // `studies/{study_id}/series/{series_id}/instances/{instance_id}/metadata`).
             dicomWebPath: dicomWebPath,  // TODO: Update placeholder value.

             auth: authClient,
         };

         cloudHealthcare.projects.locations.datasets.dicomStores.studies.series.instances.retrieveMetadata(request, function(err, response) {
             if (err) {
                 console.error(err);
                 return;
             }

             // TODO: Change code below to process the `response` object:
             console.log(JSON.stringify(response, null, 2));
         });
     });
 }

 let messageCount = 0;
 const messageHandler = (message) => {
     console.log(`Received message ${message.id}:`);
     console.log(`\tData: ${message.data}`);
     console.log(`\tAttributes: ${JSON.stringify(message.attributes)}`);
     messageCount += 1;

     var textMessageData = message.data.toString();

     if (textMessageData.includes("projects/"))
     {
         var array = textMessageData.split("/dicomWeb/");
         var parent = array[0];
         var dicomWebPath = array[1] + "/metadata";

         fetchMetaData(parent, dicomWebPath);
     }

     if(callAcknowledge)
     {
         // "Ack" (acknowledge receipt of) the message
         message.ack();
     }

 };

 // Listen for new messages until timeout is hit
 subscription.on(`message`, messageHandler);

 setTimeout(() => {
     subscription.removeListener('message', messageHandler);
     console.log(`${messageCount} message(s) received.`);
 }, timeout * 1000);