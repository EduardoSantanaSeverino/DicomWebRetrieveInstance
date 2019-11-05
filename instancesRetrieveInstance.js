//https://cloud.google.com/healthcare/docs/reference/rest/v1beta1/projects.locations.datasets.dicomStores.studies.series.instances/retrieveInstance
// BEFORE RUNNING:
// ---------------
// 1. If not already done, enable the Cloud Healthcare API
//    and check the quota for your project at
//    https://console.developers.google.com/apis/api/healthcare
// 2. This sample uses Application Default Credentials for authentication.
//    If not already done, install the gcloud CLI from
//    https://cloud.google.com/sdk and run
//    `gcloud beta auth application-default login`.
//    For more information, see
//    https://developers.google.com/identity/protocols/application-default-credentials
// 3. Install the Node.js client library by running
//    `npm install googleapis --save`

const {google} = require('googleapis');
var cloudHealthcare = google.healthcare('v1beta1');

authorize(function(authClient) {

    const cloudRegion = 'northamerica-northeast1';
    const projectId = 'centennial-dev';
    const datasetId = 'AxonDataset7';
    const dicomStoreId = 'DataStore7';
    const studyUid = '1.2.392.200046.100.14.233464500781184654070685667316508464174';
    const seriesUid = '1.2.392.200046.100.14.6811982656493498126896032175776047593220';
    const instanceUid = '1.2.392.200046.100.14.420525397820872382890175890573871259983';
    const parent = `projects/${projectId}/locations/${cloudRegion}/datasets/${datasetId}/dicomStores/${dicomStoreId}`;
    const dicomWebPath = `studies/${studyUid}/series/${seriesUid}/instances/${instanceUid}/metadata`;

    var request = {
        // The name of the DICOM store that is being accessed (e.g.,
        // `projects/{project_id}/locations/{location_id}/datasets/{dataset_id}/dicomStores/{dicom_store_id}`).
        parent: parent,  // TODO: Update placeholder value.

        // The path of the RetrieveInstanceMetadata DICOMweb request (e.g.,
        // `studies/{study_id}/series/{series_id}/instances/{instance_id}/metadata`).
        dicomWebPath: dicomWebPath,  // TODO: Update placeholder value.

        auth: authClient,
    };

    console.log(parent);
    console.log(dicomWebPath);

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