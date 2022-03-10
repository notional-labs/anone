import { ethers } from 'hardhat';
import { expect } from 'chai';
const { BN, constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { ZERO_ADDRESS } = constants;
import BigNumber from 'bignumber.js';

const {
  shouldBehaveLikeERC20,
  shouldBehaveLikeERC20Transfer,
  shouldBehaveLikeERC20Approve,
} = require('./ERC20.behavior');


describe('AnoneToken', function () {
  before(async function () {
    this.AnoneToken = await ethers.getContractFactory('AnoneToken');
  });

  context('ERC20 mintable token', async function () {
    const AnoneToken = await ethers.getContractFactory('AnoneToken');
    const name = 'Another One Token';
    const symbol = 'AN1';
    const initialSupply = ethers.utils.parseEther('95').toString();
    const signers = await ethers.getSigners();
    const deployer = signers[0];
    const owner = signers[1];
    const recipient = signers[2];
    const anotherAccount  = signers[3];
    const anone = await AnoneToken.deploy(name, symbol, initialSupply);
    
    beforeEach(async function () {
      this.anone = await this.AnoneToken.deploy(name, symbol, initialSupply);
    });

    it('has a name', async function () {
      expect(await this.token.name()).to.equal(name);
    });
  
    it('has a symbol', async function () {
      expect(await this.token.symbol()).to.equal(symbol);
    });
  
    it('has 18 decimals', async function () {
      expect(await this.token.decimals()).to.equal('18');
    });

    describe('decrease allowance', function () {
      describe('when the spender is not the zero address', function () {
        const spender = recipient;
  
        function shouldDecreaseApproval (amount: string) {
          describe('when there was no approved amount before', function () {
            it('reverts', async function () {
              await expectRevert(this.token.decreaseAllowance(
                spender, amount, { from: owner }), 'ERC20: decreased allowance below zero',
              );
            });
          });
  
          describe('when the spender had an approved amount', function () {
            const approvedAmount = amount;
  
            beforeEach(async function () {
              await this.token.approve(spender, approvedAmount, { from: owner });
            });
  
            it('emits an approval event', async function () {
              expectEvent(
                await this.token.decreaseAllowance(spender, approvedAmount, { from: owner }),
                'Approval',
                { owner: owner, spender: spender, value: '0' },
              );
            });
  
            it('decreases the spender allowance subtracting the requested amount', async function () {
              await this.token.decreaseAllowance(spender, new BigNumber(approvedAmount).minus(1), { from: owner });
  
              expect(await this.token.allowance(owner, spender)).to.equal('1');
            });
  
            it('sets the allowance to zero when all allowance is removed', async function () {
              await this.token.decreaseAllowance(spender, approvedAmount, { from: owner });
              expect(await this.token.allowance(owner, spender)).to.equal('0');
            });
  
            it('reverts when more than the full allowance is removed', async function () {
              await expectRevert(
                this.token.decreaseAllowance(spender, new BigNumber(approvedAmount).plus(1), { from: owner }),
                'ERC20: decreased allowance below zero',
              );
            });
          });
        }
  
        describe('when the sender has enough balance', function () {
          const amount = initialSupply;
  
          shouldDecreaseApproval(amount);
        });
  
        describe('when the sender does not have enough balance', function () {
          const amount = new BigNumber(initialSupply).plus(1);
  
          shouldDecreaseApproval(amount.toString());
        });
      });
  
      describe('when the spender is the zero address', function () {
        const amount = initialSupply;
        const spender = ZERO_ADDRESS;
  
        it('reverts', async function () {
          await expectRevert(this.token.decreaseAllowance(
            spender, amount, { from: owner }), 'ERC20: decreased allowance below zero',
          );
        });
      });
    });
  
    describe('increase allowance', function () {
      const amount = initialSupply;
  
      describe('when the spender is not the zero address', function () {
        const spender = recipient;
  
        describe('when the sender has enough balance', function () {
          it('emits an approval event', async function () {
            expectEvent(
              await this.token.increaseAllowance(spender, amount, { from: owner }),
              'Approval',
              { owner: owner, spender: spender, value: amount },
            );
          });
  
          describe('when there was no approved amount before', function () {
            it('approves the requested amount', async function () {
              await this.token.increaseAllowance(spender, amount, { from: owner });
  
              expect(await this.token.allowance(owner, spender)).to.equal(amount);
            });
          });
  
          describe('when the spender had an approved amount', function () {
            beforeEach(async function () {
              await this.token.approve(spender, new BigNumber(1), { from: owner });
            });
  
            it('increases the spender allowance adding the requested amount', async function () {
              await this.token.increaseAllowance(spender, amount, { from: owner });
  
              expect(await this.token.allowance(owner, spender)).to.equal(new BigNumber(amount).plus(1));
            });
          });
        });
  
        describe('when the sender does not have enough balance', function () {
          const amount = new BigNumber(initialSupply).plus(1);
  
          it('emits an approval event', async function () {
            expectEvent(
              await this.token.increaseAllowance(spender, amount, { from: owner }),
              'Approval',
              { owner: owner, spender: spender, value: amount },
            );
          });
  
          describe('when there was no approved amount before', function () {
            it('approves the requested amount', async function () {
              await this.token.increaseAllowance(spender, amount, { from: owner });
  
              expect(await this.token.allowance(owner, spender)).to.equal(amount);
            });
          });
  
          describe('when the spender had an approved amount', function () {
            beforeEach(async function () {
              await this.token.approve(spender, new BigNumber(1), { from: owner });
            });
  
            it('increases the spender allowance adding the requested amount', async function () {
              await this.token.increaseAllowance(spender, amount, { from: owner });
  
              expect(await this.token.allowance(owner, spender)).to.equal(amount.plus(1));
            });
          });
        });
      });
  
      describe('when the spender is the zero address', function () {
        const spender = ZERO_ADDRESS;
  
        it('reverts', async function () {
          await expectRevert(
            this.token.increaseAllowance(spender, amount, { from: owner }), 'ERC20: approve to the zero address',
          );
        });
      });
    });
  
    describe('_mint', function () {
      const amount = new BigNumber(50);
      it('rejects a null account', async function () {
        await expectRevert(
          this.token.mint(ZERO_ADDRESS, amount), 'ERC20: mint to the zero address',
        );
      });
  
      describe('for a non zero account', function () {
        beforeEach('minting', async function () {
          this.receipt = await this.token.mint(recipient, amount);
        });
  
        it('increments totalSupply', async function () {
          const expectedSupply = new BigNumber(initialSupply).plus(amount);
          expect(await this.token.totalSupply()).to.equal(expectedSupply);
        });
  
        it('increments recipient balance', async function () {
          expect(await this.token.balanceOf(recipient)).to.equal(amount);
        });
  
        it('emits Transfer event', async function () {
          const event = expectEvent(
            this.receipt,
            'Transfer',
            { from: ZERO_ADDRESS, to: recipient },
          );
  
          expect(event.args.value).to.equal(amount);
        });
      });
    });
  
    describe('_burn', function () {
      it('rejects a null account', async function () {
        await expectRevert(this.token.burn(ZERO_ADDRESS, new BigNumber(1)),
          'ERC20: burn from the zero address');
      });
  
      describe('for a non zero account', function () {
        it('rejects burning more than balance', async function () {
          await expectRevert(this.token.burn(
            owner, new BigNumber(initialSupply).plus(1)), 'ERC20: burn amount exceeds balance',
          );
        });
  
        const describeBurn = function (description: string, amount: BigNumber.Value) {
          describe(description, function () {
            beforeEach('burning', async function () {
              this.receipt = await this.token.burn(owner, amount);
            });
  
            it('decrements totalSupply', async function () {
              const expectedSupply = new BigNumber(initialSupply).minus(amount);
              expect(await this.token.totalSupply()).to.equal(expectedSupply);
            });
  
            it('decrements owner balance', async function () {
              const expectedBalance = new BigNumber(initialSupply).minus(amount);
              expect(await this.token.balanceOf(owner)).to.equal(expectedBalance);
            });
  
            it('emits Transfer event', async function () {
              const event = expectEvent(
                this.receipt,
                'Transfer',
                { from: owner, to: ZERO_ADDRESS },
              );
  
              expect(event.args.value).to.equal(amount);
            });
          });
        };
  
        describeBurn('for entire balance', initialSupply);
        describeBurn('for less amount than balance', new BigNumber(initialSupply).minus(1));
      });
    });
  
    describe('_transfer', function () {
      shouldBehaveLikeERC20Transfer('ERC20', owner, recipient, initialSupply, function (from: any, to: any, amount: any) {
        return anone.transferInternal(from, to, amount);
      });
  
      describe('when the sender is the zero address', function () {
        it('reverts', async function () {
          await expectRevert(this.token.transferInternal(ZERO_ADDRESS, recipient, initialSupply),
            'ERC20: transfer from the zero address',
          );
        });
      });
    });
  
    describe('_approve', function () {
      shouldBehaveLikeERC20Approve('ERC20', owner, recipient, initialSupply, function (owner: any, spender: any, amount: any) {
        return anone.approveInternal(owner, spender, amount);
      });
  
      describe('when the owner is the zero address', function () {
        it('reverts', async function () {
          await expectRevert(this.token.approveInternal(ZERO_ADDRESS, recipient, initialSupply),
            'ERC20: approve from the zero address',
          );
        });
      });
    });

  });
});
