import {readFileSync} from 'node:fs';
import mjml2html from 'mjml';
const source = readFileSync('src/email.mjml','utf8');
const result = mjml2html(source,{validationLevel:'strict'});
if(result.errors.length){
  for(const err of result.errors) console.error(`[${err.line ?? '?'}] ${err.message}`);
  process.exitCode=1;
}else console.log('MJML syntax validated. Actual email-client rendering still needs testing.');
