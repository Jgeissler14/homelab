flux uninstall
k delete ns cert-manager cnpg-cluster cnpg-system ingress-nginx kube-prometheus-stack
k delete crd certificaterequests.cert-manager.io certificates.cert-manager.io challenges.acme.cert-manager.io clusterissuers.cert-manager.io issuers.cert-manager.io orders.acme.cert-manager.io \n
k delete crd alertmanagerconfigs.monitoring.coreos.com alertmanagers.monitoring.coreos.com podmonitors.monitoring.coreos.com probes.monitoring.coreos.com prometheusagents.monitoring.coreos.com prometheuses.monitoring.coreos.com prometheusrules.monitoring.coreos.com scrapeconfigs.monitoring.coreos.com servicemonitors.monitoring.coreos.com thanosrulers.monitoring.coreos.com
k delete crd clusterimagecatalogs.postgresql.cnpg.io
k delete crd backups.postgresql.cnpg.io clusterimagecatalogs.postgresql.cnpg.io clusters.postgresql.cnpg.io databases.postgresql.cnpg.io imagecatalogs.postgresql.cnpg.io poolers.postgresql.cnpg.io publications.postgresql.cnpg.io scheduledbackups.postgresql.cnpg.io subscriptions.postgresql.cnpg.io

rm -rf ./k3s/clusters/production/flux-system
git add .
git commit -m 'reset cluster'
git push