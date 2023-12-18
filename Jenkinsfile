pipeline {

    agent any
/*
	tools {
        maven "maven3"
    }
*/
    environment {
        clientregistry = "davimehra/test-client"
        serverregistry = "davimehra/test-server"
        registryCredential = 'dockerhub'
    }

    stages{

        stage('Build Client App Image') {
          steps {
            script {
              dockerClientImage = docker.build clientregistry + ":V$BUILD_NUMBER"
            }
          }
        }
        stage('Build Server App Image') {
          steps {
            script {
              dockerServerImage = docker.build serverregistry + ":V$BUILD_NUMBER"
            }
          }
        }

        stage('Upload Client and Server Image'){
          steps{
            script {
              docker.withRegistry('', registryCredential) {
                dockerClientImage.push("V$BUILD_NUMBER")
                dockerClientImage.push('latest')
                dockerServerImage.push("V$BUILD_NUMBER")
                dockerServerImage.push('latest')
              }
            }
          }
        }


        stage('Remove Unused docker image') {
          steps{
            sh "docker rmi $clientregistry:V$BUILD_NUMBER && docker rmi $serverregistry:V$BUILD_NUMBER "
          }
        }

        stage('Kubernetes Deploy') {
          agent {label 'KOPS'}
            steps {
              sh "helm upgrade --install --force test-site helm/test-helm --set client_image=${clientregistry}:V${BUILD_NUMBER},server_image=${serverregistry}:V${BUILD_NUMBER} --namespace prod"
            }
        }
    }


}