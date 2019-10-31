'use strict';

/*const main = (
    projectId = process.env.GCLOUD_PROJECT,
    cloudRegion = 'northamerica-northeast1',
    datasetId,
    dicomStoreId,
    studyUid,
    seriesUid,
    instanceUid
) => {*/
const main = () => {
    // [START healthcare_dicomweb_retrieve_instance]
    const {google} = require('googleapis');
    const healthcare = google.healthcare('v1beta1');
    const fs = require('fs');
    const util = require('util');
    const writeFile = util.promisify(fs.writeFile);
    const fileName = 'instance_file.dcm';

    const dicomWebRetrieveInstance = async () => {
        const auth = await google.auth.getClient({
            scopes: ['https://www.googleapis.com/auth/cloud-platform'],
        });
        google.options({
            auth,
            headers: {Accept: 'application/dicom; transfer-syntax=*'},
            responseType: 'arraybuffer',
        });
        // projects/centennial-dev/locations/northamerica-northeast1/datasets/AxonDataset7/dicomStores/DataStore7/dicomWeb/
        // studies/1.2.392.200046.100.14.233464500781184654070685667316508464174/
        // series/1.2.392.200046.100.14.6811982656493498126896032175776047593220/
        // instances/1.2.392.200046.100.14.420525397820872382890175890573871259983
        // TODO(developer): uncomment these lines before running the sample
        const cloudRegion = 'northamerica-northeast1';
        const projectId = 'centennial-dev';
        const datasetId = 'AxonDataset7';
        const dicomStoreId = 'DataStore7';
        const studyUid = '1.2.392.200046.100.14.233464500781184654070685667316508464174';
        const seriesUid = '1.2.392.200046.100.14.6811982656493498126896032175776047593220';
        const instanceUid = '1.2.392.200046.100.14.420525397820872382890175890573871259983';
        const parent = `projects/${projectId}/locations/${cloudRegion}/datasets/${datasetId}/dicomStores/${dicomStoreId}`;
        const dicomWebPath = `studies/${studyUid}/series/${seriesUid}/instances/${instanceUid}`;
        const request = {parent, dicomWebPath};

        //const instanceInstance = await healthcare.projects.locations.datasets.dicomStores.studies.series.instances.retrieveInstance(request);
        const instanceMetadata = await healthcare.projects.locations.datasets.dicomStores.studies.series.instances.retrieveMetadata(request);

        // console.log("instanceInstance");
        // console.log(JSON.stringify(instanceInstance));
        console.log("instanceMetadata");
        console.log(JSON.stringify(instanceMetadata));

        //const fileBytes = Buffer.from(instance.data);

        // console.log("instanceInstance");
        // console.log(Buffer.from(instanceInstance.data).toString());
        console.log("instanceMetadata Buffer");
        console.log(Buffer.from(instanceMetadata.data));

        console.log(
            `Retrieved DICOM instance and saved to ${fileName} in current directory`
        );
    };

    dicomWebRetrieveInstance();
    // [END healthcare_dicomweb_retrieve_instance]
};

// node dicomWebRetrieveInstance.js <projectId> <cloudRegion> <datasetId> <dicomStoreId> <studyUid> <seriesUid> <instanceUid>
//main(...process.argv.slice(2));
main();