const core = require('@actions/core');
const github = require('@actions/github');

async function run()
{
  const username = core.getInput('username', { required: true });
  const token = core.getInput('token', { required: true });
  
  const octokit = github.getOctokit(token);
  
  const { data: orgs } = await octokit.orgs.listForUser({ username, per_page: 100 });

  const result = await octokit.request('GET /orgs/{org}/members/{username}', {
    org: 'CanonicalContributorAgreement',
    username: username
  });
  
  const has_signed = (result.status == 204);
  
  core.setOutput('has_signed', has_signed);
}

run();
