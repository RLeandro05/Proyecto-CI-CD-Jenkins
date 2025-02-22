pipeline {
    agent any

    environment {
        NODEJS_HOME = tool 'NodeJS'
        PATH = "${NODEJS_HOME}/bin:${env.PATH}"
        AZURE_APP_NAME = "miapp"  // Nombre de tu App Service en Azure
        RESOURCE_GROUP = "mi-recurso-grupo"
    }

    stages {
        stage('Clonar Repositorio') {
            steps {
                git 'https://github.com/RLeandro05/Proyecto-CI-CD-Jenkins.git'
            }
        }

        stage('Instalar Dependencias') {
            steps {
                sh 'npm install'
            }
        }

        stage('Ejecutar Pruebas') {
            steps {
                sh 'ng test --watch=false --browsers=ChromeHeadless'
            }
        }

        stage('Construir Aplicación') {
            steps {
                sh 'ng build --configuration=production'
            }
        }

        stage('Crear Archivo ZIP para Despliegue') {
            steps {
                sh 'cd dist/mi-proyecto-angular && zip -r ../../build.zip .'
            }
        }

        stage('Desplegar en Azure') {
            steps {
                sh '''
                az account set --subscription "ID-de-tu-Suscripción"
                az webapp deployment source config-zip \
                  --resource-group $RESOURCE_GROUP \
                  --name $AZURE_APP_NAME \
                  --src build.zip
                '''
            }
        }
    }

    post {
        success {
            echo 'Despliegue exitoso en Azure 🚀'
        }
        failure {
            echo 'Falló el pipeline ❌'
        }
    }
}