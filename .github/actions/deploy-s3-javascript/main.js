import * as core from '@actions/core';
import * as github from '@actions/github';
import * as exec from '@actions/exec';

function run() {
    // 1) Get  some input values
    const bucket = core.getInput('buket', { required: true });
    const bucketRegion = core.getInput('bucket-region', { required: true});
    const distFolder = core.getInput('dist-folder', { required: true });

    // 2) Upload files
    const s3Uri = `s3://${bucket}`
    exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);

    const websiteUrl = `http://${bucket}.s3-website-${bucketRegion}.awazonaws.com`
    core.setOutput('website-url', websiteUrl);
    core.notice('Hello from my custom Javascript Action!');
}

run();