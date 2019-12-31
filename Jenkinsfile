pipeline {
  agent none
  stages {
    stage('Pull code') {
      steps {
        sh '''cd /var/www/http/
rm -rf /var/www/http/Confucius
git clone https://github.com/CareyWang/Confucius.git'''
      }
    }

    stage('Build') {
      steps {
        sh '''cd /var/www/http/Confucius
yarn install
yarn build'''
      }
    }

  }
}