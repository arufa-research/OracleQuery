import { getAccountByName } from "junokit";

import { OracleQuerierContract } from "../artifacts/typescript_schema/OracleQuerier";

async function run() {
  const runTs = Date.now();
  const contract_owner = getAccountByName("account_0");
  const other = getAccountByName("account_1");
  const oracle_querier = new OracleQuerierContract();
  await oracle_querier.setUpclient();

  console.log("Client setup done!! ");

  const deploy_response = await oracle_querier.deploy(
    contract_owner,
    { // custom fees
      amount: [{ amount: "750000", denom: "ujunox" }],
      gas: "18000000",
    }
  );
  console.log(deploy_response);

  const contract_info = await oracle_querier.instantiate(
    {}, 
    `oracle querier test ${runTs}`,
    contract_owner,
  );
  console.log(contract_info);
}

module.exports = { default: run };