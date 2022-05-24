# ICO module

this is intended as an implementation of ReleaseMechanism

ICO allows people to buy token of the project at pre - release price. It helps founder team to raise fund.

ICO needs a way to select people else a lot of people will buy like crazy.

## Ways to add tokens into project
1. add through personal address: this way adds tokens into the project from personal address.
    * need to check if such token amount exists in personal address
    * can be rather limiting in terms of token availability
        * new project that doesn't launch yet so no tokens on mainnet
        * a project has not enabled IBC to this launchpad

2. add through token factory: this way adds token into the project from token factory.
    * project owner can generate any amount of token into their project vault
    * high token availability
    * token generated through token factory shall not leave this launchpad through IBC in order not to confuse with the project's real token
    * there will be a list of token holders so that the real project can airdrop 1:1 to these holders

a project can either add token through way 1 or way 2. Both is not allowed.

# Project Version
1. v1: create ico
2. v2: participate in ico freely
3. v3: participate in ico with select mechanism

# ICO structure
1. project_id: the project id that this ICO is linked to
2. token_for_distribution: the total amount of coins for distribution
    * keeping a local record here helps ICO executes logic directly on ICO without the need to retrieve assets information in launchpad. After logic is executed, balances in launchpad module's project will be updated accordingly
3. total_distributed_amount: total amount for distribution
4. token_listing_price: the initial price of token (in US Dollar)

# Global params
# Message Tx
1. EnableICO: tx message to enable ico for a specific project id
2. AddDistributionToken: tx message to add token for distribution to project
3. WithdrawDistributionToken: tx message to withdraw token for distribution from project
    * only allowed before the project starts
4. ModifyTokenListingPrice: tx message to modify token listing price
    * only allowed before the project starts
5. CommitParticipation: tx message to buy tokens
    * token_commit: the amount of buy token to be commited

# Query
1. TotalAmountDistributed: query total amount distributed so as to know the release progress
2. ICO: query ico information corresponding to a project id, this is intended to check and get release mechanism of a project