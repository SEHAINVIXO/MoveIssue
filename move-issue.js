import { graphql } from "@octokit/graphql";


const testTokenFineGrain = "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";
const testTokenClassic = "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";

// const octokitGraphql = graphql.defaults({
//   headers: {
//     authorization: `Bearer ${testTokenClassic}`,
//   },
// });

function run() {
  const issueID = process.env.ISSUE_ID;
  const projectID = process.env.TARGET_PROJECT_ID;
  const milestoneTitle = process.env.MILESTONE_TITLE;

  if (milestoneTitle === "operations") {
    try {
      moveIssue();
    } catch (error) {

    }
  } else {
    console.log("not operations")
  }
}

async function moveIssue() {

  const mutation = `
    mutation moveIssue {
      addProjectV2ItemById(
        input: {projectId: "${projectID}", contentId: "${issueID}"}
      ) {
        clientMutationId
      }
    }`;

  const response = await graphql(mutation, {
    headers: {
      authorization: `Bearer ${testTokenClassic}`,
    },
  });

  console.log('Issue moved:', response);
}

run();



// async function getIssue() {
//   const query = `query GetIssueWithStatusAndMilestone {
//     viewer {
//       login
//       projectV2(number: 3) {
//         id
//         items(first: 100) {
//           edges {
//             node {
//               fieldValues(first: 4) {
//                 edges {
//                   node {
//                     ... on ProjectV2ItemFieldSingleSelectValue {
//                       id
//                       name
//                       field {
//                         ... on ProjectV2SingleSelectField {
//                           id
//                           name
//                         }
//                       }
//                     }
//                     ... on ProjectV2ItemFieldMilestoneValue {
//                       __typename
//                       milestone {
//                         title
//                       }
//                     }
//                   }
//                 }
//               }
//               type
//               id
//             }
//           }
//         }
//       }
//     }
//   }`
//   const response = await octokitGraphql(query);
//   const status = response.viewer.projectV2.items.edges[0].node.fieldValues.edges[3]
//   const milestone = response.viewer.projectV2.items.edges[0].node.fieldValues.edges[1];
//   const nodeType =  response.viewer.projectV2.items.edges[0].node.type;
//   const issueId = response.viewer.projectV2.items.edges[0].node.id;
//   console.log(milestone);
//   console.log(status);
//   console.log(`nodetype: ${nodeType} id: ${issueId}`);
// }

// getIssue();


