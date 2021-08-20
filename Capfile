# frozen_string_literal: true

require 'rubygems'
require 'bundler'
Bundler.setup(:deploy)

require 'semver'

# Load DSL and Setup Up Stages
require 'capistrano/setup'

# Includes default deployment tasks
require 'capistrano/deploy'

require 'capistrano/scm/git'
install_plugin Capistrano::SCM::Git

require 'capistrano/nvm'
require 'capistrano/rbenv'
require 'capistrano/yarn'
require 'capistrano/shell'
# require 'capistrano/bundler'
require 'slackistrano/capistrano'
# require 'capistrano/tasks'
require 'capistrano/my'
install_plugin Capistrano::My
require 'capistrano/slackistrano' # My Custom Message
# require 'capistrano/dotenv/tasks'
# require 'capistrano/dotenv'
require 'capistrano/sentry'
require 'bugsnag-capistrano' if Gem.loaded_specs.key?('bugsnag-capistrano')
