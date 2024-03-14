pipeline {
    agent any
    stages {
        stage('Setup') {
            steps {
                script {
                    if (env.GIT_BRANCH == 'origin/master') {
                        target = 'production'
                    } else {
                        target = ''
                    }
                }
            }
        }
        stage('Build'){
            when {
                expression { target == 'production' }
            }
            steps {
                echo "building"
                sshagent(['0a39231d-d882-4824-ae7f-0d892c489685']) {
                   sh """ssh -o StrictHostKeyChecking=no ansible@157.245.203.48 << EOF
                        cd /home/ansible/resource/kosei-release.eupsolution.net/web-client
                        git checkout master
                        git pull origin master
                        docker build -t registry.gitlab.com/eup/kosei-web:${GIT_COMMIT} .
                        exit
                    EOF"""
                }
            }
        }
      
        stage('Deploy') {
            when {
                expression { target == 'production' }
            }
            steps {
                echo "deploy production"
                sshagent(['0a39231d-d882-4824-ae7f-0d892c489685']) {
                  
                    sh """ssh -o StrictHostKeyChecking=no ansible@128.199.189.121 << EOF
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
