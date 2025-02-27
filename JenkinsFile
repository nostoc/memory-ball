pipeline {
    agent any

    environment {
        DOCKER_HUB_USER = 'nostochk'
        IMAGE_NAME = 'memory-ball'
        IMAGE_TAG = 'latest'
        VPS_USER = 'your-vps-user'
        VPS_IP = 'your-vps-ip'
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/your-github-user/your-repo.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${DOCKER_HUB_USER}/${IMAGE_NAME}:${IMAGE_TAG} ."
            }
        }

        stage('Login to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub-credentials', usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                    sh "echo ${DOCKER_PASS} | docker login -u ${DOCKER_USER} --password-stdin"
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                sh "docker push ${DOCKER_HUB_USER}/${IMAGE_NAME}:${IMAGE_TAG}"
            }
        }

        stage('Deploy to VPS') {
            steps {
                sshagent(['vps-ssh-key']) {
                    sh """
                    ssh -o StrictHostKeyChecking=no ${VPS_USER}@${VPS_IP} <<EOF
                    docker pull ${DOCKER_HUB_USER}/${IMAGE_NAME}:${IMAGE_TAG}
                    docker stop memory-container || true
                    docker rm memory-container || true
                    docker run -d -p 80:80 --name memory-container ${DOCKER_HUB_USER}/${IMAGE_NAME}:${IMAGE_TAG}
                    EOF
                    """
                }
            }
        }
    }
}
