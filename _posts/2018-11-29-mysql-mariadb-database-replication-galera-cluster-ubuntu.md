---
layout: post
title: "MariaDB Database Replication with Galera Cluster between 2 Ubuntu Servers"
fav: 1
---

### First Server
1. Install **MariaDB** package:
   ```bash 
   apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 0xF1656F24C74CD1D8
   add-apt-repository 'deb [arch=amd64,arm64,i386,ppc64el] http://mirror.netcologne.de/mariadb/repo/10.3/ubuntu xenial main'
   apt-get update
   debconf-set-selections <<< 'mariadb-server-10.3 mysql-server/root_password password <$MYSQL_ROOT_PASSWORD>'
   debconf-set-selections <<< 'mariadb-server-10.3 mysql-server/root_password_again password <$MYSQL_ROOT_PASSWORD>'
   apt-get install -y mariadb-server
   ```
2. Stop MariaDB service:
   ```bash
   systemctl stop mysql
   ```
3. Edit `/etc/mysql/conf.d/galera.cnf`:
   ```
   [mysqld]
   binlog_format=ROW
   default-storage-engine=InnoDB
   innodb_autoinc_lock_mode=2
   bind-address=0.0.0.0
   
   wsrep_on=ON
   wsrep_provider=/usr/lib/galera/libgalera_smm.so
   wsrep_cluster_name="<$CLUSTER_NAME>"
   wsrep_cluster_address="gcomm://<$NODE1_IP>,<$NODE2_IP>"
   wsrep_sst_method=rsync
   
   wsrep_node_address="<$NODE_IP>"
   wsrep_node_name="<$NODE_NAME>"
   ```
4. Create new Galera Cluster:
   ```bash
   galera_new_cluster
   ```

### Second Server
1. Repeat steps **1.** to **3.** from above.
2. Copy the content from the first servers `/etc/mysql/debian.cnf` file to the second server.
3. Start MariaDB service:
   ```bash
   systemctl start mysql
   ```
4. Check the replication status:
   ```bash
   mysql -u root -p<$MYSQL_ROOT_PASSWORD> -e "SHOW STATUS LIKE 'wsrep_cluster_size'"
   ```
   If the replication is working properly it should return this:
   ```
   +--------------------+-------+
   | Variable_name      | Value |
   +--------------------+-------+
   | wsrep_cluster_size | 2     |
   +--------------------+-------+
   ```

---
1. <https://www.digitalocean.com/community/tutorials/how-to-configure-a-galera-cluster-with-mariadb-10-1-on-ubuntu-16-04-servers>
