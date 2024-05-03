pipeline {
    agent any
    stages {
        stage('Setup') {
            steps {
                script {
                    if (env.GIT_BRANCH == 'origin/master') {
                        target = 'production'
                    } else if (env.GIT_BRANCH == 'deployment/dev') {
                        target = 'dev'
                    }
                }
            }
        }
        stage('Build'){
            when {
                expression { target == 'dev' }
            }
            steps {
                echo "building dev"
                sshagent(['0a39231d-d882-4824-ae7f-0d892c489685']) {
                   sh """ssh -o StrictHostKeyChecking=no ansible@206.189.158.254 << EOF
                        cd /home/ansible/resource/kosei.eupsolution.net/web-client
                        git checkout deployment/dev
                        git pull origin deployment/dev
                        docker build -t registry.gitlab.com/eup/kosei-web:${GIT_COMMIT} .
                        exit
                    EOF"""
                }
            }
        }
      
        stage('Deploy Dev') {
            when {
                expression { target == 'dev' }
            }
            steps {
                echo "deploy dev"
                sshagent(['0a39231d-d882-4824-ae7f-0d892c489685']) {
                    sh """ssh -o StrictHostKeyChecking=no ansible@152.42.180.38 << EOF
                        docker pull registry.gitlab.com/eup/kosei-web:${GIT_COMMIT} 
                        exit
                    EOF"""
                    sh """ssh -o StrictHostKeyChecking=no ansible@206.189.158.254 << EOF
                        docker service scale kosei-admin_web-client=2
                        docker service update --image registry.gitlab.com/eup/kosei-web:${GIT_COMMIT} kosei-admin_web-client
                        docker service scale kosei-admin_web-client=1
                        exit
                    EOF"""
                }
            }
        }
    }
}
