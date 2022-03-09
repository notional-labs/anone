import { DeployFunction } from 'hardhat-deploy/dist/types';
import { HardhatRuntimeEnvironment } from 'hardhat/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment): Promise<void> {
  const { deployments, getNamedAccounts } = hre;

  const { deploy } = deployments;

  const { deployer } = await getNamedAccounts();

  await deploy('AnoneToken', {
    from: deployer,
    args: ["Another One Token", "AN1", 18],
    log: true,
  });
};

func.tags = ['AnoneToken'];
export default func;
