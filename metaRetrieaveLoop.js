 const {google} = require('googleapis');
 const {PubSub} = require('@google-cloud/pubsub');

 var cloudHealthcare = google.healthcare('v1beta1');

 const cloudRegion = 'northamerica-northeast1';
 const projectId = 'centennial-dev';
 const datasetId = 'AxonDataset7';
 const dicomStoreId = 'DataStore7';
 const studyUid = '1.2.392.200046.100.14.233464500781184654070685667316508464174';
 const seriesUid = '1.2.392.200046.100.14.6811982656493498126896032175776047593220';
 const instanceUid = '1.2.392.200046.100.14.420525397820872382890175890573871259983';
 const parent = `projects/${projectId}/locations/${cloudRegion}/datasets/${datasetId}/dicomStores/${dicomStoreId}`;
 const dicomWebPath = `studies/${studyUid}/series/${seriesUid}/instances/${instanceUid}/metadata`;
 //const request = {parent, dicomWebPath};

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

 function authorize(callback) {
   google.auth.getClient({
             scopes: ['https://www.googleapis.com/auth/cloud-platform']
           }).then(client => {
         callback(client);
       }).catch(err => {
         console.error('authentication failed: ', err);
       });
 }
