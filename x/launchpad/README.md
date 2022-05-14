# Launchpad module

this module governs all logic and activities related to launchpad's project. 

I take on a more wide understanding of launchpad. It should be a platform to release initial tokens to users.
1. ICO: ICO is both a way to release initial tokens and to raise funds.
1. lock drop: lock drop is a way to release initial tokens in exchange for user commitment.
1. air drop: air drop is just for releasing initial tokens to users.
1. liquidity bootstrapping auction: both as a way to release tokens, create initial liquidity, and gain user commitment.

I call these release mechanisms. Each release mechanism will have its own module.

A lot of effort goes to doing and researching the same release mechanisms again and again for each new project.

This module will save plenty of time for new project to lauch.

# Project Version
1. v1: create project
2. v2: add participation

# a project structure
1. project_owner: the owner address of project. The address that owns the project.
1. project_title: the title of release project
1. project_id: unique id of project
    * 0 means error
1. project_address: to store tokens
    * project address is ADR-028 compliant
    * it will use address package of Osmosis: [Osmosis address](https://github.com/osmosis-labs/osmosis/pull/169) 
1. project_information: information for the project
    * One can only modify project_information when the project is not active
    * Needs a field to check if the project is already active
1. start_time: start time of project schedule.
    * One can only modify start_time when the project is not active
    * Needs a field to check if the project is already active
1. (DEPRECATED)release_mechanism: the release mechanism used for this project. If a chain intends to use multiple release mechanism on different phases, it should create multiple projects.
1. project_active: Is the current project already active

# global params
1. global_project_id: this serves as counter to keep track of number of projects. 
    * genesis value of this param will reflect total number of project at genesis
    * because of the above, I cannot add this to params.proto
    * start from 1
# tx Message
1. CreateProject: tx message CreateProject to create a project.
1. DeleteProject: tx message DeleteProject to delete a project.
    * Can only delete if the project is not active
1. ModifyStartTime: tx message ModifyStartTime to modify start time of a project.
    * Can only delete if the project is not active
1. ModifyProjectInformation: tx message to modify a project information. A project information should be as stable as possible to build trust with users and investors.
    * Can only delete if the project is not active

# query Message
1. Project: query project information through project_id.
2. TotalProjectID: get total number of project_id