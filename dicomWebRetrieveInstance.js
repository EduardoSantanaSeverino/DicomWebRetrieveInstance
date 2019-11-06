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
        const dicomWebPath = `studies/${studyUid}/series/${seriesUid}/instances/${instanceUid}/metadata`;
        const request = {parent, dicomWebPath};

        //const instanceInstance = await healthcare.projects.locations.datasets.dicomStores.studies.series.instances.retrieveInstance(request);
        const instanceMetadata = await healthcare.projects.locations.datasets.dicomStores.studies.series.instances.retrieveMetadata(request);
        // console.log("instanceInstance");
        // console.log(JSON.stringify(instanceInstance));
        console.log("instanceMetadata");
        //console.log(JSON.stringify(instanceMetadata));

        //const fileBytes = Buffer.from(instance.data);

        // console.log("instanceInstance");
        // console.log(Buffer.from(instanceInstance.data).toString());
        console.log("instanceMetadata Buffer");
        console.log(JSON.stringify(instanceMetadata.data, null, 2));
        //console.log(Buffer.from(instanceMetadata.data));

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


/*
Expecte result: like this url test api:

https://cloud.google.com/healthcare/docs/reference/rest/v1beta1/projects.locations.datasets.dicomStores.studies.series.instances/retrieveMetadata?apix_params=%7B%22parent%22%3A%22projects%2Fcentennial-dev%2Flocations%2Fnorthamerica-northeast1%2Fdatasets%2FAxonDataset7%2FdicomStores%2FDataStore7%22%2C%22dicomWebPath%22%3A%22studies%2F1.2.392.200046.100.14.233464500781184654070685667316508464174%2Fseries%2F1.2.392.200046.100.14.6811982656493498126896032175776047593220%2Finstances%2F1.2.392.200046.100.14.420525397820872382890175890573871259983%2Fmetadata%22%7D

[{"00020002":{"vr":"UI","Value":["1.2.840.10008.5.1.4.1.1.1.1"]},"00020003":{"vr":"UI","Value":["1.2.392.200046.100.14.420525397820872382890175890573871259983"]},"00020010":{"vr":"UI","Value":["1.2.840.10008.1.2"]},"00020012":{"vr":"UI","Value":["1.2.40.0.13.1.3"]},"00020013":{"vr":"SH","Value":["dcm4che-3.3.8"]},"00080008":{"vr":"CS","Value":["DERIVED","PRIMARY",""]},"00080016":{"vr":"UI","Value":["1.2.840.10008.5.1.4.1.1.1.1"]},"00080018":{"vr":"UI","Value":["1.2.392.200046.100.14.420525397820872382890175890573871259983"]},"00080020":{"vr":"DA","Value":["20190328"]},"00080021":{"vr":"DA","Value":["20190328"]},"00080022":{"vr":"DA","Value":["20190328"]},"00080030":{"vr":"TM","Value":["112131.020"]},"00080031":{"vr":"TM","Value":["113325.353"]},"00080032":{"vr":"TM","Value":["113351.800"]},"00080050":{"vr":"SH"},"00080060":{"vr":"CS","Value":["DX"]},"00080068":{"vr":"CS","Value":["FOR PRESENTATION"]},"00080070":{"vr":"LO","Value":["Canon Inc."]},"00080080":{"vr":"LO","Value":["Org Two"]},"00080090":{"vr":"PN"},"00081010":{"vr":"SH","Value":["UNIVERSAL-MAC"]},"0008103E":{"vr":"LO","Value":["Left Fore Navicular Skyline"]},"00081070":{"vr":"PN","Value":[{"Alphabetic":"cxdiUser"}]},"00081090":{"vr":"LO","Value":["CXDI Control Software NE"]},"00082218":{"vr":"SQ"},"00100010":{"vr":"PN","Value":[{"Alphabetic":"Johnny Johnson"}]},"00100020":{"vr":"LO","Value":["Cash Cow"]},"00100030":{"vr":"DA","Value":["20050101"]},"00100040":{"vr":"CS","Value":["O"]},"00180015":{"vr":"CS"},"00181000":{"vr":"LO","Value":["270000D4"]},"00181020":{"vr":"LO","Value":["2.11.0.12"]},"00181030":{"vr":"LO","Value":["Left Fore Navicular Skyline"]},"00181050":{"vr":"DS","Value":[0.125]},"00181164":{"vr":"DS","Value":[0.125,0.125]},"00181401":{"vr":"LO","Value":["A24,0:SB20,0,15,0:E18,7,18:D15,10:N5:G*:S2"]},"00181508":{"vr":"CS"},"00187004":{"vr":"CS","Value":["SCINTILLATOR"]},"00187005":{"vr":"CS","Value":["AREA"]},"0018700A":{"vr":"SH","Value":["270000D4"]},"0018700C":{"vr":"DA","Value":["20140909"]},"0018700E":{"vr":"TM","Value":["083048.630"]},"0018701A":{"vr":"DS","Value":[1,1]},"0020000D":{"vr":"UI","Value":["1.2.392.200046.100.14.233464500781184654070685667316508464174"]},"0020000E":{"vr":"UI","Value":["1.2.392.200046.100.14.6811982656493498126896032175776047593220"]},"00200010":{"vr":"SH","Value":["1"]},"00200011":{"vr":"IS","Value":[6]},"00200013":{"vr":"IS","Value":[1]},"00200020":{"vr":"CS","Value":["L","F"]},"00200062":{"vr":"CS","Value":["L"]},"00280002":{"vr":"US","Value":[1]},"00280004":{"vr":"CS","Value":["MONOCHROME2"]},"00280010":{"vr":"US","Value":[1670]},"00280011":{"vr":"US","Value":[1629]},"00280100":{"vr":"US","Value":[16]},"00280101":{"vr":"US","Value":[12]},"00280102":{"vr":"US","Value":[11]},"00280103":{"vr":"US","Value":[0]},"00280301":{"vr":"CS","Value":["NO"]},"00281040":{"vr":"CS","Value":["LOG"]},"00281041":{"vr":"SS","Value":[1]},"00281050":{"vr":"DS","Value":[2048]},"00281051":{"vr":"DS","Value":[4096]},"00281052":{"vr":"DS","Value":[0]},"00281053":{"vr":"DS","Value":[1]},"00281054":{"vr":"LO","Value":["US"]},"00282110":{"vr":"CS","Value":["00"]},"00400244":{"vr":"DA","Value":["20190328"]},"00400245":{"vr":"TM","Value":["112131.020"]},"00400253":{"vr":"SH","Value":["90356"]},"00400260":{"vr":"SQ","Value":[{"00080100":{"vr":"SH","Value":["Empty"]},"00080102":{"vr":"SH","Value":["Canon Unique"]},"00080104":{"vr":"LO","Value":["Empty"]}}]},"00400555":{"vr":"SQ"},"20500020":{"vr":"CS","Value":["IDENTITY"]}}]

formated:
[
   {
      "00020002":{
         "vr":"UI",
         "Value":[
            "1.2.840.10008.5.1.4.1.1.1.1"
         ]
      },
      "00020003":{
         "vr":"UI",
         "Value":[
            "1.2.392.200046.100.14.420525397820872382890175890573871259983"
         ]
      },
      "00020010":{
         "vr":"UI",
         "Value":[
            "1.2.840.10008.1.2"
         ]
      },
      "00020012":{
         "vr":"UI",
         "Value":[
            "1.2.40.0.13.1.3"
         ]
      },
      "00020013":{
         "vr":"SH",
         "Value":[
            "dcm4che-3.3.8"
         ]
      },
      "00080008":{
         "vr":"CS",
         "Value":[
            "DERIVED",
            "PRIMARY",
            ""
         ]
      },
      "00080016":{
         "vr":"UI",
         "Value":[
            "1.2.840.10008.5.1.4.1.1.1.1"
         ]
      },
      "00080018":{
         "vr":"UI",
         "Value":[
            "1.2.392.200046.100.14.420525397820872382890175890573871259983"
         ]
      },
      "00080020":{
         "vr":"DA",
         "Value":[
            "20190328"
         ]
      },
      "00080021":{
         "vr":"DA",
         "Value":[
            "20190328"
         ]
      },
      "00080022":{
         "vr":"DA",
         "Value":[
            "20190328"
         ]
      },
      "00080030":{
         "vr":"TM",
         "Value":[
            "112131.020"
         ]
      },
      "00080031":{
         "vr":"TM",
         "Value":[
            "113325.353"
         ]
      },
      "00080032":{
         "vr":"TM",
         "Value":[
            "113351.800"
         ]
      },
      "00080050":{
         "vr":"SH"
      },
      "00080060":{
         "vr":"CS",
         "Value":[
            "DX"
         ]
      },
      "00080068":{
         "vr":"CS",
         "Value":[
            "FOR PRESENTATION"
         ]
      },
      "00080070":{
         "vr":"LO",
         "Value":[
            "Canon Inc."
         ]
      },
      "00080080":{
         "vr":"LO",
         "Value":[
            "Org Two"
         ]
      },
      "00080090":{
         "vr":"PN"
      },
      "00081010":{
         "vr":"SH",
         "Value":[
            "UNIVERSAL-MAC"
         ]
      },
      "0008103E":{
         "vr":"LO",
         "Value":[
            "Left Fore Navicular Skyline"
         ]
      },
      "00081070":{
         "vr":"PN",
         "Value":[
            {
               "Alphabetic":"cxdiUser"
            }
         ]
      },
      "00081090":{
         "vr":"LO",
         "Value":[
            "CXDI Control Software NE"
         ]
      },
      "00082218":{
         "vr":"SQ"
      },
      "00100010":{
         "vr":"PN",
         "Value":[
            {
               "Alphabetic":"Johnny Johnson"
            }
         ]
      },
      "00100020":{
         "vr":"LO",
         "Value":[
            "Cash Cow"
         ]
      },
      "00100030":{
         "vr":"DA",
         "Value":[
            "20050101"
         ]
      },
      "00100040":{
         "vr":"CS",
         "Value":[
            "O"
         ]
      },
      "00180015":{
         "vr":"CS"
      },
      "00181000":{
         "vr":"LO",
         "Value":[
            "270000D4"
         ]
      },
      "00181020":{
         "vr":"LO",
         "Value":[
            "2.11.0.12"
         ]
      },
      "00181030":{
         "vr":"LO",
         "Value":[
            "Left Fore Navicular Skyline"
         ]
      },
      "00181050":{
         "vr":"DS",
         "Value":[
            0.125
         ]
      },
      "00181164":{
         "vr":"DS",
         "Value":[
            0.125,
            0.125
         ]
      },
      "00181401":{
         "vr":"LO",
         "Value":[
            "A24,0:SB20,0,15,0:E18,7,18:D15,10:N5:G*:S2"
         ]
      },
      "00181508":{
         "vr":"CS"
      },
      "00187004":{
         "vr":"CS",
         "Value":[
            "SCINTILLATOR"
         ]
      },
      "00187005":{
         "vr":"CS",
         "Value":[
            "AREA"
         ]
      },
      "0018700A":{
         "vr":"SH",
         "Value":[
            "270000D4"
         ]
      },
      "0018700C":{
         "vr":"DA",
         "Value":[
            "20140909"
         ]
      },
      "0018700E":{
         "vr":"TM",
         "Value":[
            "083048.630"
         ]
      },
      "0018701A":{
         "vr":"DS",
         "Value":[
            1,
            1
         ]
      },
      "0020000D":{
         "vr":"UI",
         "Value":[
            "1.2.392.200046.100.14.233464500781184654070685667316508464174"
         ]
      },
      "0020000E":{
         "vr":"UI",
         "Value":[
            "1.2.392.200046.100.14.6811982656493498126896032175776047593220"
         ]
      },
      "00200010":{
         "vr":"SH",
         "Value":[
            "1"
         ]
      },
      "00200011":{
         "vr":"IS",
         "Value":[
            6
         ]
      },
      "00200013":{
         "vr":"IS",
         "Value":[
            1
         ]
      },
      "00200020":{
         "vr":"CS",
         "Value":[
            "L",
            "F"
         ]
      },
      "00200062":{
         "vr":"CS",
         "Value":[
            "L"
         ]
      },
      "00280002":{
         "vr":"US",
         "Value":[
            1
         ]
      },
      "00280004":{
         "vr":"CS",
         "Value":[
            "MONOCHROME2"
         ]
      },
      "00280010":{
         "vr":"US",
         "Value":[
            1670
         ]
      },
      "00280011":{
         "vr":"US",
         "Value":[
            1629
         ]
      },
      "00280100":{
         "vr":"US",
         "Value":[
            16
         ]
      },
      "00280101":{
         "vr":"US",
         "Value":[
            12
         ]
      },
      "00280102":{
         "vr":"US",
         "Value":[
            11
         ]
      },
      "00280103":{
         "vr":"US",
         "Value":[
            0
         ]
      },
      "00280301":{
         "vr":"CS",
         "Value":[
            "NO"
         ]
      },
      "00281040":{
         "vr":"CS",
         "Value":[
            "LOG"
         ]
      },
      "00281041":{
         "vr":"SS",
         "Value":[
            1
         ]
      },
      "00281050":{
         "vr":"DS",
         "Value":[
            2048
         ]
      },
      "00281051":{
         "vr":"DS",
         "Value":[
            4096
         ]
      },
      "00281052":{
         "vr":"DS",
         "Value":[
            0
         ]
      },
      "00281053":{
         "vr":"DS",
         "Value":[
            1
         ]
      },
      "00281054":{
         "vr":"LO",
         "Value":[
            "US"
         ]
      },
      "00282110":{
         "vr":"CS",
         "Value":[
            "00"
         ]
      },
      "00400244":{
         "vr":"DA",
         "Value":[
            "20190328"
         ]
      },
      "00400245":{
         "vr":"TM",
         "Value":[
            "112131.020"
         ]
      },
      "00400253":{
         "vr":"SH",
         "Value":[
            "90356"
         ]
      },
      "00400260":{
         "vr":"SQ",
         "Value":[
            {
               "00080100":{
                  "vr":"SH",
                  "Value":[
                     "Empty"
                  ]
               },
               "00080102":{
                  "vr":"SH",
                  "Value":[
                     "Canon Unique"
                  ]
               },
               "00080104":{
                  "vr":"LO",
                  "Value":[
                     "Empty"
                  ]
               }
            }
         ]
      },
      "00400555":{
         "vr":"SQ"
      },
      "20500020":{
         "vr":"CS",
         "Value":[
            "IDENTITY"
         ]
      }
   }
]
*/
