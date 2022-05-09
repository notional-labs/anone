# ICO module

this is intended as an implementation of ReleaseMechanism

ICO allows people to buy token of the project at pre - release price. It helps founder team to raise fund.

ICO needs a way to select people else a lot of people will buy like crazy.

# Project Version
1. v1: create ico
2. v2: participate in ico freely
3. v3: participate in ico with select mechanism

# ICO structure
1. project_id: the project id that this ICO is linked to
2. token_for_distribution: the total amount of coins for distribution
3. distributed_amount: total amount distributed
4. token_listing_price: the initial price of token (in UST)

# Global params
# Message Tx
1. EnableICO: tx message to enable ico for a specific project id
2. AddDistributionToken: tx message to add token for distribution to project
3. ModifyTokenListingPrice: tx message to modify token listing price
    * only allowed before the project starts
4. CommitParticipation: tx message to buy tokens
    * token_commit: the amount of buy token to be commited

# Query
1. TotalAmountDistributed: query total amount distributed so as to know the release progress
2. ICO: query ico information corresponding to a project id, this is intended to check and get release mechanism of a project